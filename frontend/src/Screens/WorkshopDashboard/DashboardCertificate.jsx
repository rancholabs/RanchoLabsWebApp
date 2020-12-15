import React, { useState } from "react";
import "./css/DashboardCertificate.css";
import certificate from "./img/certificatemodal.png";
import lock from "./img/lock.png";
import medal from "./img/medal.gif";
import Fontawesome from "react-fontawesome";
import fb from "./img/fb.png";
import wa from "./img/whatsapp.png";
import twitter from "./img/twitter.png";
import gmail from "./img/gmail.png";
import messenger from "./img/messanger.png";
import linkedin from "./img/linkedin.png";
import share from "./img/share.png";
import axios from "axios";
import DashboardCertTemplate from "./DashboardCertTemplate";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ShareIcon from "./ShareIcon";

const shareIcons = [
  {
    icon: fb,
    name: "Facebook",
  },
  // {
  //   icon: messenger,
  //   name: "Messenger",
  // },
  {
    icon: wa,
    name: "WhatsApp",
  },
  // {
  //   icon: gmail,
  //   name: "Gmail",
  // },
  {
    icon: linkedin,
    name: "LinkedIn",
  },
  {
    icon: twitter,
    name: "Twitter",
  },
];

const Certificate = ({
  userInfo,
  activeCourse,
  studentCerts,
  showAppliedCertLoadingBanner,
  freeClassCert,
  from,
  to,
  month,
  year,
  userId,
  allCerts,
  minAttendance,
}) => {
  const [iscertificate, setCertficate] = useState(false);
  const [isShareExp, setShareExp] = useState(false);
  const [certFile, setcertFile] = useState(null);
  const [open, setOpen] = React.useState(false);

  function showCertificate() {
    setCertficate(!iscertificate);
  }

  if (iscertificate || isShareExp) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const copyShareLink = async () => {
    setOpen(true);
    // certificate shared => generate new cert for student
    const userInfoToken = localStorage.getItem("userInfo");
    const token = userInfoToken ? JSON.parse(userInfoToken).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    let count = 0;
    let allCerts;

    // GENERATE CERT FILE AND UPLOAD TO S3

    const formData = new FormData();
    formData.append("files", certFile);
    const fileID = await axios
      .post("/api/file", formData, config)
      .then((res) => res.data.fileId)
      .catch((error) => console.log(error));

    // UPLOAD CERTIFICATE IN STUDENT PROFILE

    if (studentCerts) {
      allCerts = [...studentCerts];
      if (count === 0) {
        allCerts.push({
          id: 1111,
          file: fileID,
          courseId: activeCourse,
        });
      }
    } else {
      allCerts = [
        {
          id: 1111,
          file: fileID,
          courseId: activeCourse,
        },
      ];
    }

    const body = {
      certificates: allCerts,
    };
    axios
      .post("/api/profile/student/certificates", body, config)
      .then((res) => {
        console.log(res.data);
        // UPDATE DATA IN ALL CERTIFICATES SCHEMA
        const allcertbody = {
          name: userInfo,
          file: fileID,
          userId: userId,
          courseId: activeCourse,
        };
        axios.post("/api/certificate", allcertbody, config).then((resp) => {
          setOpen(false);
          console.log(resp.data);
          showAppliedCertLoadingBanner();
        });
      });
  };

  const updateCertFile = (file) => {
    setcertFile(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        style={{ zIndex: 10000 }}
        open={open}
        className="cert__backdrop"
      >
        <CircularProgress color="inherit" />
        Generating your certificate. This may take 1-2 minutes.
      </Backdrop>
      <div className="dashboardcertificate row mx-auto">
        <div className="certificate-content">
          <div className="certificate-title">CONGRATULATIONS</div>
          <div className="certificate-desc">
            Dear{" "}
            {(userInfo?.first ? userInfo?.first : "") +
              " " +
              (userInfo?.last ? userInfo?.last : "")}
            , we are so pleased to see you complete our{" "}
            {freeClassCert ? "free class" : "workshop"}. Excellence isn't a
            skill but an attitude. Keep up your good work and continue to strive
            for perfection! As a token of appreciation, we are giving you a
            Certificate of Completion.
          </div>
          <div className="get-certificate">
            <a>
              <button
                onClick={() => {
                  if (minAttendance) {
                    showCertificate();
                  }
                }}
              >
                GET IT NOW &nbsp; <Fontawesome name="arrow-right" />
              </button>
            </a>
          </div>
        </div>
        <div className="medal">
          <img src={medal} alt=""></img>
        </div>
      </div>
      {iscertificate && (
        <>
          <div className="dashboard-certificate-modal">
            <span className="close">
              <button onClick={showCertificate}>&times;</button>
            </span>
            <div className="row mx-0 cmodal-content">
              <div className="certificate-details">
                <div className="certificate-title">CONGRATULATIONS</div>
                <div className="certificate-modal-content">
                  Dear{" "}
                  {userInfo?.first
                    ? userInfo?.first
                    : "" + " " + userInfo?.last
                    ? userInfo?.last
                    : ""}
                  , Congratulations on completing the{" "}
                  {freeClassCert ? "free class" : "free workshop"} offered by
                  RanchoLabs. Not all students get this opportunity and we
                  really applaud your efforts in taking time to learn new
                  things. We hope this is the first achievement amongst many to
                  follow.
                </div>
                <div className="certificate-modal-content-unlock">
                  To unlock your certificate, Tell three friends about your
                  experience at RanchoLabs’{" "}
                  {freeClassCert ? "Free Class" : "workshop"}.
                </div>
                <div className="certificate-share align-items-center">
                  <button
                    onClick={() => {
                      setShareExp(true);
                      showCertificate();
                    }}
                  >
                    <img src={share} /> SHARE EXPERIENCE
                  </button>
                </div>
              </div>
              <div className="certificate-image">
                <img src={certificate} alt="" />
                <img className="lock" src={lock} />
              </div>
            </div>
          </div>
        </>
      )}
      {isShareExp && (
        <>
          <div className="dashboard-share-exp">
            <div className="close">
              <button onClick={() => setShareExp(false)}>&times;</button>
            </div>
            <div className="share-exp-content">
              <div className="share-exp-title">Share the Experience</div>
              <div className="share-exp-subtitle">
                Tell others what you did at Rancho Labs
              </div>
              <div className="row mx-0 share-icons">
                {shareIcons.map((i) => {
                  return (
                    <ShareIcon icon={i} copyShareLink={copyShareLink} />
                    // <div
                    //   className="text-center"
                    //   style={{ alignSelf: "flex-end" }}
                    //   onClick={() => {
                    //     document.getElementById("fb-share-btn").click();
                    //   }}
                    // >
                    //   <div>
                    //     <img className="img-fluid" src={i.icon} />
                    //   </div>
                    //   <div className="icon-name">{i.name}</div>
                    // </div>
                  );
                })}
                {/* <FacebookShareButton
                  quote="Check out Rancho Labs! | https://rancholabs.com"
                  id="fb-share-btn"
                />
                <WhatsappShareButton
                  title="Check out Rancho Labs! | https://rancholabs.com"
                  separator="|"
                />
                <LinkedinShareButton title="Check out Rancho Labs! | https://rancholabs.com" />
                <TwitterShareButton title="Check out Rancho Labs! | https://rancholabs.com" /> */}
              </div>
              <div className="share-link">
                <input type="text" placeholder="link" />
                <button onClick={copyShareLink}>COPY</button>
              </div>
            </div>
          </div>
          <div>
            <DashboardCertTemplate
              updateCertFile={updateCertFile}
              userInfo={userInfo}
              from={from}
              to={to}
              month={month}
              year={year}
              allCerts={allCerts}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Certificate;
