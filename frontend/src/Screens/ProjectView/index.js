import React, { useEffect } from "react";
import "./index.css";
import Logo from "./../../Components/img/logo.png";
import {
  faWhatsappSquare,
  faFacebookF,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProject } from "../../Actions/ProjectView";
import { setDefaultHeader, updateHeader } from "../../Actions/Header";

const ProjectView = () => {
  const {
    header,
    brief,
    components,
    steps,
    conclusion,
    user,
    isUploaded,
  } = useSelector((state) => state.projectView);
  const name = user ? user.name.first : "";
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateHeader({
        backgroundColor: "#FFFFFF",
        color: "#0A0E2A",
        iconColor: "#0A0E2A",
      })
    );
    document.title = "Student Project";

    return () => {
      dispatch(setDefaultHeader());
    };
  }, []);

  const sharePage = (url) => {
    window.open(url.replace("[URL_FULL]", window.location.href), "_blank");
  };

  const history = useHistory();

  useEffect(() => {
    if (user && user.name) {
      document.title = `${user.name.first}'s Project`;
    }
  }, [user]);

  useEffect(() => {
    if (projectId) dispatch(getProject(projectId));
  }, [projectId]);

  useEffect(() => {
    if (isUploaded === false)
      history.replace("/errorHandler?message=Project Not Found");
  }, [isUploaded]);

  return (
    <>
      {(header || brief || components || steps || conclusion) &&
      isUploaded !== false ? (
        <div className="project-view">
          <img
            src={header && header.image ? header.image.filePath : ""}
            className="project-image"
          />
          <div className="watermark">
            <div className="box">
              <div className="before-top"></div>
              <div className="box-container">
                <div>
                  <img src={Logo} className="image" />
                  <div className="name">RANCHO LABS</div>
                </div>
              </div>
              <div className="before-bottom"></div>
            </div>
          </div>
          <div className="project-heading">
            {header && header.heading ? header.heading : ""}
          </div>
          <div className="project-category">
            <div>
              <div className="arrow-stick">
                <div className="point"></div>
                <div className="stick"></div>
              </div>
              <div className="name">
                {header && header.category ? header.category : ""}
              </div>
              <div className="arrow-stick">
                <div className="stick"></div>
                <div className="point"></div>
              </div>
            </div>
          </div>
          <div className="project-by">
            <div>
              <div className="text">Project By</div>
              <div className="name">{name}</div>
            </div>
          </div>
          <div className="project-brief-heading">BRIEF</div>
          <div className="project-brief">{brief ? brief : ""}</div>
          {header && header.video ? (
            <video className="project-video" controls={true}>
              <source
                src={header && header.video ? header.video.filePath : ""}
              />
            </video>
          ) : null}
          <div className="components-heading">COMPONENTS</div>
          {components && (
            <div className="components">
              {components.map((c, idx) => {
                return (
                  <div key={idx}>
                    <div className="bullet"></div>
                    <div className="text">{c.value}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="project-steps-heading">STEPS</div>
          {steps && (
            <div className="project-steps">
              {steps.map((s, idx) => {
                return (
                  <div key={idx}>
                    <div className="step-heading">
                      <span className="step-no">STEP {idx + 1}</span>
                      {s.heading}
                    </div>
                    <img
                      src={s.image && s.image.filePath ? s.image.filePath : ""}
                      className="image"
                    />
                    <div className="sdesc">{s.description}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="project-conclusion-heading">CONCLUSION</div>
          {conclusion && (
            <div className="project-conclusion">
              {conclusion.map((c, idx) => {
                return (
                  <div key={idx}>
                    <div className="conclusion-heading">{c.heading}</div>
                    <div className="conclusion-sub-heading">{c.subHeading}</div>
                    <img
                      src={c.image && c.image.filePath ? c.image.filePath : ""}
                      className="image"
                    />
                    <div className="desc">{c.description}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="social-btns">
            {[
              {
                className: "twitter",
                icon: faTwitterSquare,
                url:
                  "http://twitter.com/share?text=MY PROJECT&url=[URL_FULL]&hashtags=#MYPROJECT",
              },
              {
                className: "fb",
                icon: faFacebookF,
                url: "http://www.facebook.com/sharer.php?u=[URL_FULL]",
              },
              {
                className: "gmail",
                icon: faEnvelope,
                url:
                  "https://mail.google.com/mail/?view=cm&fs=1&su=My Project&body=[URL_FULL]",
              },
              {
                className: "wa",
                icon: faWhatsappSquare,
                url: "whatsapp://send?&text=MY PROJECT [URL_FULL]",
              },
            ].map((sb, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => sharePage(sb.url)}
                  className={`social-btn ${sb.className}`}
                >
                  <FontAwesomeIcon className="icon" icon={sb.icon} />
                  <div className="text">Share</div>
                </div>
              );
            })}
          </div>
          <div className="profile">
            <div>
              <img
                src={user && user.profilePic ? user.profilePic.filePath : ""}
                className="pic"
              />
              <div className="name-about">
                <div className="name">{name}</div>
                <div className="about">
                  About {name}{" "}
                  {user && user.description ? user.description : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "#FFFFFF" }}>
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default ProjectView;
