import React from "react";
import "./css/DashboardCertificateComplete.css";
import certificate from "./img/certificatemodal.png";
import Fontawesome from "react-fontawesome";
import DashboardCertTemplate from "./DashboardCertTemplate";
import { useState } from "react";
import { useEffect } from "react";
import ShareIcon from "./ShareIcon";
import fb from "./img/fb.png";
import wa from "./img/whatsapp.png";
import twitter from "./img/twitter.png";
import gmail from "./img/gmail.png";
import messenger from "./img/messanger.png";
import linkedin from "./img/linkedin.png";

const CertificateComplete = ({
  userInfo,
  activeCourse,
  studentCerts,
  from,
  to,
  month,
  year,
}) => {
  const [certURL, setCertURL] = useState("");
  const [shareCert, setshareCert] = useState(false);

  useEffect(() => {
    if (studentCerts) {
      const userInfoToken = localStorage.getItem("userInfo");
      const token = userInfoToken ? JSON.parse(userInfoToken).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      let singleCert = studentCerts.filter(
        (cert) => cert.courseId === activeCourse
      );
      if (singleCert.length > 0) {
        singleCert = singleCert[0];
        console.log(singleCert);
        setCertURL(singleCert.file.filePath);
      }
    }
  }, [studentCerts]);

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

  return (
    <div className="dashboard-certificate-complete">
      {shareCert ? (
        <div className="dashboard-share-exp">
          <div className="close">
            <button onClick={() => setshareCert(false)}>&times;</button>
          </div>
          <div className="share-exp-content">
            <div className="share-exp-title">Share your Certificate!</div>
            <div className="share-exp-subtitle">
              Tell others about your achievement at Rancho Labs
            </div>
            <div className="row mx-0 share-icons">
              {shareIcons.map((i) => {
                return (
                  <ShareIcon
                    icon={i}
                    sharelink={certURL}
                    shareText="Checkout my certificate for the course I did on Rancho Labs!"
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="row mx-0">
          <div className="certificate-image">
            {/* {certURL === "" ? (
            <DashboardCertTemplate
              updateCertURL={updateCertURL}
              visible={false}
              userInfo={userInfo}
              from={from}
              to={to}
              month={month}
              year={year}
            />
          ) : ( */}
            <img src={certURL} alt="" />
            {/* )} */}
          </div>
          <div className="complete-certificate-content">
            <div className="complete-congrats">CONGRATULATIONS</div>
            <div className="complete-desc">
              We are glad to share the certificate to you. The certificate has
              been added to your website. You can check your profile for further
              certifications.
            </div>
            <div className="complete-button">
              <a href="/profile/student" target="_blank">
                <button>
                  <Fontawesome name="external-link" /> &nbsp;Visit Your Website
                </button>
              </a>
            </div>
            <div
              className="row mx-0"
              style={{ justifyContent: "space-between" }}
            >
              <a
                href={certURL}
                target="_blank"
                download={certURL}
                className="complete-button"
              >
                <button>
                  <span class="downloadicon"></span>Download
                </button>
              </a>
              <div
                className="complete-button"
                onClick={() => setshareCert(true)}
              >
                <button>
                  <span class="shareicon"></span>Share{" "}
                  <span className="mobile-hide">Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateComplete;
