import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import Logo from "./../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import ArrowBack from "../../Asssets/Icon ionic-ios-arrow-round-forward@2x.png";

const Footer = () => {
  const { appName, isIPadMiniMobileView } = useSelector(
    (state) => state.appDetails
  );
  const { footerDisplay } = useSelector((state) => state.footer);
  const footerTop = useRef();
  const footerLinks = useRef();
  const footerBottom = useRef();

  const history = useHistory();
  const goHome = () => {
    history.push("/");
  };

  useEffect(() => {
    const onresize = () => {
      if (
        window.screen.width <= 600
        // (isIPadMiniMobileView && window.screen.width <= 768)
      ) {
        footerTop.current.classList.add("mobile");
        footerLinks.current.classList.add("mobile");
        footerBottom.current.classList.add("mobile");
      } else {
        footerTop.current.classList.remove("mobile");
        footerLinks.current.classList.remove("mobile");
        footerBottom.current.classList.remove("mobile");
      }
    };
    window.addEventListener("resize", onresize);
    onresize();

    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, [isIPadMiniMobileView]);

  return (
    <footer style={{ display: footerDisplay }}>
      <div className="footer-top" ref={footerTop}>
        <div className="flex">
          {/* <div className="reach-us">
                <div className="logo" onClick={goHome}>
                    <img className="app-icon" alt="app-icon" src={Logo} />
                    <div className="app-name">{appName}</div>
                </div>
                <div className="logo-mob" onClick={goHome}>
                    <div className="name">{appName.split(' ').map((word) => { return word[0].toUpperCase() + word.substr(1).toLowerCase()}).join(' ')}</div>
                </div>
                <div className="reach-us-title">Reach Us</div>
                <div className="email-with-icon">
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faEnvelope} />
                    <span className="email">labs.rancho@gmail.com</span>
                </div>
                <div className="icon-list">
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faInstagram} />
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faFacebookF} />
                    <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faLinkedinIn} />
                </div>
              </div> */}
          <div className="footer-subscribe">
            <h3>Subscribe To Our News</h3>
            <p>
              Enter you email and get latest information on <br /> our new
              courses.
            </p>
            <div className="footer-subscribe-input">
              <input placeholder="Email Address" />
              <button>
                <img src={ArrowBack}></img>
              </button>
            </div>
          </div>
          <div className="footer-mobile-links">
            <a href="/courses">
              <p>Curriculum</p>
            </a>
            <a href="/aboutUs">
              <p>About us</p>
            </a>
            <p
              onClick={() =>
                document
                  .querySelector(".footer-mobile-links-contact-section")
                  .classList.toggle("show")
              }
            >
              Contact Us
            </p>
            <span className="footer-mobile-links-contact-section">
              <hr />
              <p className="footer-mobile-links-contact-section-tags">
                {" "}
                <FontAwesomeIcon
                  className="icon"
                  color="#87878F"
                  icon={faPhoneAlt}
                  style={{ marginRight: "4px" }}
                />{" "}
                +91-7427800499
              </p>
              <p className="footer-mobile-links-contact-section-tags">
                {" "}
                <FontAwesomeIcon
                  className="icon"
                  color="#87878F"
                  icon={faEnvelope}
                  style={{ marginRight: "4px" }}
                />{" "}
                labs.rancho@gmail.com
              </p>
            </span>
            <a href="/blog">
              <p>Blog</p>
            </a>

            <div className="footer-mobile-icons">
              <a href="https://twitter.com/RanchoLabs">
                <FontAwesomeIcon
                  className="icon"
                  color="#3CFAFF"
                  icon={faTwitter}
                />
              </a>
              <a href="https://www.linkedin.com/company/rancho-labs/">
                <FontAwesomeIcon
                  className="icon"
                  color="#3CFAFF"
                  icon={faLinkedinIn}
                />{" "}
              </a>{" "}
              <a href="https://www.facebook.com/RanchoLabs">
                <FontAwesomeIcon
                  className="icon"
                  color="#3CFAFF"
                  icon={faFacebookF}
                />{" "}
              </a>{" "}
              <a href="https://www.instagram.com/rancho.labs/">
                <FontAwesomeIcon
                  className="icon"
                  color="#3CFAFF"
                  icon={faInstagram}
                />
              </a>
            </div>
          </div>
          <div className="footer-links" ref={footerLinks}>
            <div className="flex">
              <div className="company footer-links-section">
                <h3 className="head">Important Links</h3>
                <a href="/aboutUs">
                  <p>About us</p>
                </a>
                <a href="/login">
                  <p>Log in</p>
                </a>
                <a href="/freeclass">
                  <p>Sign up</p>
                </a>
              </div>
              <div className="footer-links-section">
                <h3 className="head">Curriculum</h3>
                <a href="/courses">
                  <p>Robotics</p>
                </a>
                <a href="/courses">
                  <p>Space Science</p>
                </a>
                <a href="/courses">
                  <p>Artificial Intelligence</p>
                </a>
                <a href="/courses">
                  <p>Recommended</p>
                </a>
              </div>
              <div className="footer-links-section">
                <h3 className="head">Contact us</h3>
                <p>
                  {" "}
                  <FontAwesomeIcon
                    className="icon"
                    color="#87878F"
                    icon={faPhoneAlt}
                    style={{ marginRight: "4px" }}
                  />{" "}
                  +91-7427800499
                </p>
                <p>
                  {" "}
                  <FontAwesomeIcon
                    className="icon"
                    color="#87878F"
                    icon={faEnvelope}
                    style={{ marginRight: "4px" }}
                  />{" "}
                  labs.rancho@gmail.com
                </p>
                <p className="footer-illustration-note">
                  * The illustrations used in the website have been sourced from
                  various sites and the credit goes to respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom" ref={footerBottom}>
        <p className="footer-bottom-copyright">
          @ Ranchovation Labs Pvt Ltd | Rancho Labs
        </p>
        <div className="footer-bottom-right-section">
          <div className="footer-bottom-icons">
            <a href="https://twitter.com/RanchoLabs">
              <FontAwesomeIcon
                className="icon"
                color="#3CFAFF"
                icon={faTwitter}
              />
            </a>
            <a href="https://www.linkedin.com/company/rancho-labs/">
              <FontAwesomeIcon
                className="icon"
                color="#3CFAFF"
                icon={faLinkedinIn}
              />{" "}
            </a>{" "}
            <a href="https://www.facebook.com/RanchoLabs">
              <FontAwesomeIcon
                className="icon"
                color="#3CFAFF"
                icon={faFacebookF}
              />{" "}
            </a>{" "}
            <a href="https://www.instagram.com/rancho.labs/">
              <FontAwesomeIcon
                className="icon"
                color="#3CFAFF"
                icon={faInstagram}
              />
            </a>
          </div>
          <div className="footer-bottom-dum"></div>
          <p className="footer-bottom-center-align">Terms and Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
