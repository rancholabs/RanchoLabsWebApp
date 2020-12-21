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
import keys from "../../paykey";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

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
  certPaid,
  updateCertPaidStatus,
}) => {
  const [iscertificate, setCertficate] = useState(false);
  const [isShareExp, setShareExp] = useState(false);
  const [certFile, setcertFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openForCertPay, setopenForCertPay] = React.useState(false);
  const [userpaymentId, setuserpaymentId] = React.useState("");
  const [userorderId, setuserorderId] = React.useState("");

  function showCertificate() {
    setCertficate(!iscertificate);
  }
  console.log(certPaid);
  React.useEffect(() => {
    console.log(certPaid);
    if (certPaid) {
      setCertficate(true);
    }
  }, [certPaid]);

  // if (iscertificate || isShareExp) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "auto";
  // }

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

    if (fileID && fileID.toString().length > 5) {
      console.log(fileID);
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
      console.log(body);
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
            // payment: {
            //   paymentId: userpaymentId,
            //   orderId: userorderId,
            // },
          };
          // axios.put("/api/certificate", allcertbody, config).then((resp) => {
          //   setOpen(false);
          //   console.log(resp.data);
          //   showAppliedCertLoadingBanner();
          //   // showAppliedCertLoadingBanner();
          // });
          axios.post("/api/certificate", allcertbody, config).then((resp) => {
            setOpen(false);
            console.log(resp.data);
            showAppliedCertLoadingBanner();
            // showAppliedCertLoadingBanner();
          });
        });
    } else {
      alert(
        "Unable to generate certificate at this time. Please try again later!"
      );
      setOpen(false);
    }
  };

  const checkPayment = (payid, orderid) => {
    setopenForCertPay(true);
    setuserpaymentId(payid);
    setuserorderId(orderid);
    const body = {
      userId: userId,
      courseId: activeCourse,
      name: userInfo,
      payment: {
        paymentId: payid,
        signature: null,
        orderId: orderid,
      },
    };
    setTimeout(() => {
      setopenForCertPay(false);
      axios
        .post("/api/certificate/verify", body)
        .then((res) => {
          // payment done
          updateCertPaidStatus(true);
          showCertificate();
        })
        .catch((err) => {
          console.log(err);
          // payment not done
          alert("Unable to verify payment!");
        });
    }, 5000);
  };

  const displayRazorpay = async () => {
    const _userInfo = localStorage.getItem("userInfo");
    const token = _userInfo ? JSON.parse(_userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const paymentBody = {
      name: userInfo,
      userId: userId,
      courseId: activeCourse,
      price: {
        amount: 199,
        currencyCode: "INR",
      },
      reason: "certificate",
    };

    const data = await axios
      .post("/api/payment/order", paymentBody, config)
      .then((res) => {
        return res.data;
      });

    const options = {
      key: keys.RAZOR_PAY_KEY_ID, //test mode key
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Rancho Labs",
      description: "Thank you for choosing Rancho Labs.",
      image:
        "https://rancho-labs-app.s3.amazonaws.com/images/logo-1607930535803.png",
      handler: function (response) {
        //  after payment
        checkPayment(response.razorpay_payment_id, response.razorpay_order_id);
      },
      prefill: {
        name: userInfo.first + " " + (userInfo.last ? userInfo.last : ""),
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const updateCertFile = (file, dataUrl) => {
    setcertFile(file);
    console.log(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const payCertFees = () => {
    displayRazorpay();
  };
  return (
    <>
      <Backdrop
        style={{ zIndex: 10000 }}
        open={open}
        className="cert__backdrop"
      >
        <CircularProgress color="inherit" />
        Generating your certificate. This may take 1-2 minutes. Kindly do not
        refresh or close the window.
      </Backdrop>
      <Backdrop
        style={{ zIndex: 10000 }}
        open={openForCertPay}
        className="cert__backdrop"
      >
        <CircularProgress color="inherit" />
        Verifying your payment. Please wait. Kindly do not refresh or close the
        window.
      </Backdrop>
      {iscertificate ? (
        <div className="dashboard-certificate-modal">
          {/* <span className="close">
            <button onClick={showCertificate}>&times;</button>
          </span> */}
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
                RanchoLabs. Not all students get this opportunity and we really
                applaud your efforts in taking time to learn new things. We hope
                this is the first achievement amongst many to follow.
              </div>
              <div className="certificate-share align-items-center">
                <button
                  onClick={() => {
                    copyShareLink();
                  }}
                >
                  Get Certificate
                </button>
              </div>
            </div>
            <div className="certificate-image">
              <img src={certificate} alt="" />
              <img className="lock" src={lock} />
            </div>
          </div>
          <div id="dashboard__certTemp">
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
        </div>
      ) : (
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
              skill but an attitude. Keep up your good work and continue to
              strive for perfection! As a token of appreciation, we are giving
              you a Certificate of Completion.
            </div>
            <div className="get-certificate">
              <a>
                <button
                  onClick={() => {
                    if (minAttendance) {
                      console.log("Generating cert...");
                      // payCertFees();
                      copyShareLink();
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
          <div id="dashboard__certTemp">
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
        </div>
      )}
      {/* {iscertificate && (
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
                <div className="certificate-share align-items-center">
                  <button
                    onClick={() => {
                      copyShareLink();
                    }}
                  >
                    Get Certificate
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
      )} */}
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
              <div
                className="row mx-0 share-icons"
                onClick={() => {
                  setTimeout(() => {
                    showAppliedCertLoadingBanner();
                  }, 3000);
                }}
              >
                {shareIcons.map((i) => {
                  return (
                    <ShareIcon icon={i} />
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
                <button
                  onClick={() => {
                    setTimeout(() => {
                      showAppliedCertLoadingBanner();
                    }, 3000);
                  }}
                >
                  COPY
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Certificate;
