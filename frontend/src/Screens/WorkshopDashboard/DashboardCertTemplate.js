import React, { useEffect, useState } from "react";
import "./css/DashboardCertTemplate.css";
import * as htmlToImage from "html-to-image";

// IMAGES
import CertificateDesign from "./img/certificate-design-2.png";
import anshulSign from "./img/anshul_sign-removebg-preview.png";
import amanSign from "./img/aman_sign-removebg-preview.png";
import downloadImg from "./img/download@2x.png";
import certQRimage from "./img/cert__qr.png";
import logoImg from "./img/logo_2.png";

function DashboardCertTemplate({
  updateCertFile,
  visible,
  userInfo,
  from,
  to,
  month,
  year,
  allCerts,
}) {
  const [today, setToday] = useState("");

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  console.log(from, to, month, year);

  useEffect(() => {
    var node = document.getElementById("certificate_design__2");

    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        const yourFile = dataURLtoFile(dataUrl, "coursecertificate.png");
        updateCertFile(yourFile, dataUrl);
      })
      .catch(function (error) {
        // alert(error);
        console.error("oops, something went wrong!", error);
      });

    var today = new Date();
    today =
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      "/" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    setToday(today);
  }, []);

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div id="certificate_design__2">
      <img id="certificate-design-2" src={CertificateDesign} />
      <div id="CERTIFICATE_OF_COMPLETION">
        <span>CERTIFICATE OF </span>
        <span
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            color: "rgba(191,158,51,1)",
          }}
        >
          COMPLETION
        </span>
      </div>
      <img id="logo_2" src={logoImg} />

      <div id="This_certificate_is_awarded_to">
        <span>This certificate is awarded to</span>
      </div>
      <div id="ID09122020">
        <span>{today}</span>
      </div>
      <div id="for_completing_the_2_Days_CODI">
        <span>for completing the 2 Days </span>
        <span
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
          }}
        >
          CODING, ROBOTICS & AI WORKSHOP{" "}
        </span>
        <br />
        <span>
          held on {from} and {to} {monthArray[month]} {year}. During this
          workshop, {userInfo?.first} learnt <br />
          about Arduino, Arduino Programming, different electrical components,
          <br /> and their working.
        </span>
      </div>
      <div id="Ananya">
        <span>{userInfo?.first}</span>
      </div>
      <div id="ANSHUL_AGRAWAL_">
        <span>ANSHUL AGRAWAL</span>
        <br />
      </div>
      <div id="ID_123_">
        <span>ID #123</span>
        <br />
      </div>
      <div id="Founder">
        <span>Founder</span>
      </div>
      <div id="ID123456">
        <span>{"#RLCT" + (allCerts.length ? allCerts.length + 1 : 1)}</span>
      </div>
      <div id="Co-Founder">
        <span>Co-Founder</span>
      </div>
      <div id="AMAN_KUMAR_">
        <span>AMAN KUMAR</span>
        <br />
      </div>
      <img id="download" src={certQRimage} />

      <svg class="Path_1" viewBox="0 0 5 5">
        <path id="Path_1" d="M 0 0"></path>
      </svg>
      <img id="aman_sign-removebg-preview" src={amanSign} />

      <img id="anshul_sign-removebg-preview" src={anshulSign} />
    </div>
  );
}

export default DashboardCertTemplate;
