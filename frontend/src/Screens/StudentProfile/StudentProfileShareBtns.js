import React, { useEffect, useRef } from "react";
import "./css/StudentProfileShareBtns.css";
import {
  faWhatsappSquare,
  faFacebookF,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setIsShareOpen } from "../../Actions/StudentProfile";

const StudentProfileShareBtns = ({ type, id }) => {
  const { url, title, hashtag } = (() => {
    const domain = window.location.origin;
    switch (type.toUpperCase()) {
      case "PROJECT":
        return {
          url: `${domain}/project/${id}`,
          title: "My Project",
          hashtag: "myproject",
        };
      case "INNOVATION":
        return {
          url: `${domain}/innovation/${id}`,
          title: "My Innovation",
          hashtag: "myinnovation",
        };
      case "PROFILE":
      default:
        return {
          url: `${domain}/profile/student/${id}`,
          title: "My Profile",
          hashtag: "myprofile",
        };
    }
  })();

  console.log(url);

  const shareRef = useRef();

  useEffect(() => {
    const clickListener = (e) => {
      if (e.target == shareRef.current) closeHandler();
    };
    window.addEventListener("click", clickListener);
  }, []);

  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(setIsShareOpen(false));
  };

  const shareDetails = [
    {
      className: "twitter",
      icon: faTwitterSquare,
      url: `http://twitter.com/share?text=${title}&url=${url}&hashtags=${hashtag}`,
    },
    {
      className: "fb",
      icon: faFacebookF,
      url: `http://www.facebook.com/sharer.php?u=${url}`,
    },
    {
      className: "gmail",
      icon: faEnvelope,
      url: `https://mail.google.com/mail/?view=cm&fs=1&su=${title}&body=${url}`,
    },
    {
      className: "wa",
      icon: faWhatsappSquare,
      url: `whatsapp://send?&text=${title} ${url}`,
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
    <div ref={shareRef} className="Student-profile-share-btns">
      <div className="btn-container">
        <svg
          onClick={closeHandler}
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="times"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          className="svg-inline--fa fa-times fa-w-10 fa-3x close-share-icon"
        >
          <path
            fill="currentColor"
            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
            className=""
          ></path>
        </svg>
        <div className="social-btns">
          {shareDetails.map((sd, idx) => {
            return (
              <div
                key={idx}
                onClick={() =>
                  sd.url
                    ? window.open(sd.url, "_blank")
                    : copyTextToClipboard(url)
                }
                className={`social-btn ${sd.className}`}
              >
                <FontAwesomeIcon className="icon" icon={sd.icon} />
                <div className="text">{sd.url ? "Share" : "Copy"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileShareBtns;
