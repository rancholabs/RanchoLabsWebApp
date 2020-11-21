import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Logo from "./../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SignupFreeWorkshop from "../SignupFreeWorkshop";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../Actions/userAction";
import NewLogoSVG from "../Header/logo.svg";

const SubLink = ({ display, link, navCloseHandler }) => {
  return (
    <div>
      {link ? (
        <NavLink to={link} onClick={() => navCloseHandler()}>
          {display}
        </NavLink>
      ) : (
        <div
          style={{ color: "#FFFFFF", cursor: "pointer" }}
          onClick={() => alert("The page is under construction")}
        >
          {display}
        </div>
      )}
    </div>
  );
};

const SideNav = ({ navCloseHandler }) => {
  const { appName, isIPadMiniMobileView } = useSelector(
    (state) => state.appDetails
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const [subLinks, setSubLinks] = useState([]);
  const sideNav = useRef();
  const sideNavLinks = useRef();
  const sideNavLogo = useRef();
  const sideNavClose = useRef();
  const dispatch = useDispatch();

  const history = useHistory();

  const goToPage = (path) => {
    navCloseHandler();
    history.push(path);
  };

  const logoutUser = () => {
    dispatch(logout());
    navCloseHandler();
  };

  useEffect(() => {
    let sLinks = [
      {
        display: "HOME",
        link: "/",
      },
      {
        display: "COURSES",
        link: "/courses",
      },
      /*{
                display: 'WORKSHOP',
                link: ''
            },
            {
                display: 'LAB TOUR',
                link: ''
            },*/
      {
        display: "ABOUT US",
        link: "/aboutUs",
      },
      {
        display: "BLOG",
        link: "blog",
      },
      /*{
                display: 'CONTACT',
                link: ''
            }*/
    ];

    if (userInfo) {
      sLinks.splice(
        0,
        0,
        ...[
          {
            display: "DASHBOARD",
            link: "/dashboard",
          },
          {
            display: "PROFILE",
            link: "",
          },
        ]
      );
      console.log(sLinks);
    }
    setSubLinks(sLinks);
  }, [userInfo]);

  useEffect(() => {
    const onresize = () => {
      if (
        window.screen.width <= 600 ||
        (isIPadMiniMobileView && window.screen.width <= 768)
      ) {
        sideNav.current.classList.add("mobile");
        sideNavLinks.current.classList.add("mobile");
        sideNavLogo.current.classList.add("mobile");
        sideNavClose.current
          .getElementsByClassName("side-nav-close")[0]
          .classList.add("mobile");
      } else {
        sideNav.current.classList.remove("mobile");
        sideNavLinks.current.classList.remove("mobile");
        sideNavLogo.current.classList.remove("mobile");
        sideNavClose.current
          .getElementsByClassName("side-nav-close")[0]
          .classList.remove("mobile");
      }
    };
    window.addEventListener("resize", onresize);
    onresize();

    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, [isIPadMiniMobileView]);

  useEffect(() => {
    const listenClick = (e) => {
      if (
        sideNav.current &&
        e.target !== sideNav.current &&
        !sideNav.current.contains(e.target)
      ) {
        navCloseHandler();
      }
    };

    window.addEventListener("click", (e) => listenClick(e));

    return () => {
      window.removeEventListener("click", (e) => listenClick(e));
    };
  }, []);

  return (
    <div className="side-nav" ref={sideNav}>
      <div className="head-line">
        <div
          className="side-nav-logo"
          ref={sideNavLogo}
          onClick={() => goToPage("/")}
        >
          <img className="icon" alt="app-icon" src={NewLogoSVG} />
        </div>
        <div ref={sideNavClose}>
          <FontAwesomeIcon
            className="side-nav-close"
            color="#3CFAFF"
            icon={faTimes}
            onClick={() => navCloseHandler()}
          />
        </div>
      </div>
      <div className="side-nav-links" ref={sideNavLinks}>
        {!userInfo && (
          <SignupFreeWorkshop
            onclickHandler={() => {
              history.push("/freeclass?loginfor=freeclass");
              navCloseHandler();
            }}
          />
        )}
        <div className="sub-links">
          {subLinks.map(({ display, link }, si) => {
            return (
              <SubLink
                key={si}
                display={display}
                link={link}
                navCloseHandler={navCloseHandler}
              />
            );
          })}
        </div>
        <div className="email-icon">
          <FontAwesomeIcon className="icon" color="#3CFAFF" icon={faEnvelope} />
          <span>
            <a href="mailto:labs.rancho@gmail.com" className="email">
              labs.rancho@gmail.com
            </a>
          </span>
        </div>
        {!userInfo ? (
          <div className="signup-login-btns">
            <div onClick={() => goToPage("/login")}>
              <div>LOGIN</div>
            </div>
          </div>
        ) : (
          <div className="logout-btn" onClick={logoutUser}>
            <div>LOGOUT</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
