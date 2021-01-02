import React from "react";
import "../StudentProfile/css/StudentProfileShareBtns.css";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsappSquare,
  faFacebookF,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

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
  const [title, settitle] = useState("My Certificate");
  const [hashtag, sethashtag] = useState("mycertificate");
  const [certText, setcertText] = useState(
    "Checkout my certificate for a course I did at Rancho Labs!"
  );
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
        // console.log(singleCert);
        setCertURL(singleCert?.file?.filePath);
      }
    }
  }, [studentCerts]);

  const shareDetails = [
    {
      className: "twitter",
      icon: faTwitterSquare,
      url: `http://twitter.com/share?text=${title}&url=${certURL}&hashtags=${hashtag}`,
    },
    {
      className: "fb",
      icon: faFacebookF,
      url: `http://www.facebook.com/sharer.php?u=${certURL}`,
    },
    {
      className: "gmail",
      icon: faEnvelope,
      url: `https://mail.google.com/mail/?view=cm&fs=1&su=${title}&body=${certURL}`,
    },
    {
      className: "wa",
      icon: faWhatsappSquare,
      url: `https://api.whatsapp.com/send?text=${certText} ${certURL}`,
    },
    {
      className: "gmail",
      icon: faCopy,
    },
  ];

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = "transparent";

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    document.body.removeChild(textArea);
  }

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
            <div className="social-btns">
              {shareDetails.map((sd, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() =>
                      sd.url
                        ? window.open(sd.url, "_blank")
                        : copyTextToClipboard(certURL)
                    }
                    className={`social-btn ${sd.className}`}
                  >
                    <FontAwesomeIcon className="icon" icon={sd.icon} />
                  </div>
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
