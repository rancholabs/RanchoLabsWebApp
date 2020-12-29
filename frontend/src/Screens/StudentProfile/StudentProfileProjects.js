import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setIsShareOpen, updateProjects } from "../../Actions/StudentProfile";
import "./css/StudentProfileProjects.css";
import projectImage from "./img/project.png";
import StudentProfileEditIcon from "./StudentProfileEditIcon";

const StudentProfileProjects = () => {
  const { projects: projectsArr, isEditView } = useSelector(
    (state) => state.studentProfile
  );
  const [projects, setProjects] = useState(projectsArr ? projectsArr : []);
  const [projectsTemp, setProjectsTemp] = useState(
    projectsArr ? projectsArr : []
  );

  const dispatch = useDispatch();

  const [activePage, setActivePage] = useState(0);
  const [totalPagesLastIndex, setTotalPagesLastIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const shareWebsite = (id) => {
    dispatch(setIsShareOpen({ type: "project", id: id }));
  };

  const updateProjectIsEnabled = (id, attr, value) => {
    const objIndex = projects.findIndex((obj) => obj._id === id);
    if (objIndex >= 0) {
      const projectsNew = [
        ...projects.slice(0, objIndex),
        { ...projects[objIndex], isEnabled: !projects[objIndex].isEnabled },
        ...projects.slice(objIndex + 1),
      ];
      dispatch(updateProjects(id, !projects[objIndex].isEnabled));
      setProjects(projectsNew);
    }
  };

  const delProjectHandler = (id) => {
    if (
      window.screen.width > 600 &&
      window.confirm("Are you sure want to delete this Project ?")
    ) {
      const projectsNew = projects.filter((p) => {
        if (p._id !== id) {
          return p;
        }
      });
      dispatch(updateProjects(id));
      setProjects(projectsNew);
    } else {
      setIsPopupOpen(true);
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (projectsArr) {
      if (!isEditView) {
        setProjectsTemp(projectsArr);
        setProjects(
          projectsArr.filter((p) => {
            if (p.isEnabled) {
              return p;
            }
          })
        );
      } else {
        setProjects(projectsArr);
      }
    }
  }, [projectsArr]);

  useEffect(() => {
    const totalPagesLastIndexTemp = parseInt(
      (projects.length -
        (isEditView && projects.length < rowsPerPage * maxPages ? 0 : 1)) /
        rowsPerPage
    );
    if (totalPagesLastIndexTemp != totalPagesLastIndex) {
      setTotalPagesLastIndex(totalPagesLastIndexTemp);
    }
    if (activePage > totalPagesLastIndexTemp) {
      setActivePage(totalPagesLastIndexTemp);
    }
  }, [projects, isEditView]);

  useEffect(() => {
    if (!isEditView) {
      setProjectsTemp(projects);
      setProjects(
        projects.filter((p) => {
          if (p.isEnabled) {
            return p;
          }
        })
      );
    } else {
      setProjects(projectsTemp);
    }
  }, [isEditView]);

  const maxPages = 5;

  const rowsPerPage = 3;

  const history = useHistory();

  console.log(projects);

  return (
    <div id="student-profile-projects" className="student-profile-projects">
      <img src={projectImage} className="icon" />
      {isPopupOpen && (
        <span className="popuptext">
          Please open the site in Desktop, Laptop or Tablet to add/delete your
          profile!
        </span>
      )}
      <div className="projects-container">
        <div className="projects">
          {isEditView &&
            activePage === 0 &&
            projects.length < rowsPerPage * maxPages && (
              <div
                className="add-project"
                onClick={() => {
                  if (window.screen.width > 600) {
                    history.push("/project");
                  } else {
                    setIsPopupOpen(true);
                    setTimeout(() => {
                      setIsPopupOpen(false);
                    }, 5000);
                  }
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="plus"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="svg-inline--fa fa-plus fa-w-12 fa-3x plus-icon"
                >
                  <path
                    fill="currentColor"
                    d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                    className=""
                  ></path>
                </svg>
                <div>ADD PROJECT</div>
              </div>
            )}
          {projects
            .slice(
              activePage === 0 && projects.length < rowsPerPage * maxPages
                ? activePage * rowsPerPage
                : activePage * rowsPerPage - (isEditView ? 1 : 0),
              (activePage + 1) * rowsPerPage -
                (isEditView && projects.length < rowsPerPage * maxPages ? 1 : 0)
            )
            .map((p) => {
              if (p.header) {
                return (
                  <div
                    key={p._id}
                    onClick={() => {
                      window.open(`/project/${p._id}`, "_blank");
                    }}
                    className={!p.isUploaded ? "draft" : ""}
                  >
                    {isEditView && (
                      <>
                        <svg
                          onClick={(e) => {
                            delProjectHandler(p._id);
                            e.stopPropagation();
                          }}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fal"
                          data-icon="times"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                          className="svg-inline--fa fa-times fa-w-10 fa-3x project-remove-icon"
                        >
                          <path
                            fill="currentColor"
                            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
                            className=""
                          ></path>
                        </svg>
                        <StudentProfileEditIcon
                          onClickHandler={() =>
                            history.push(`/project?projectId=${p._id}`)
                          }
                        />
                      </>
                    )}
                    {p.isUploaded ? (
                      <img
                        className="image"
                        src={
                          p.header.image && p.header.image.filePath
                            ? p.header.image.filePath
                            : ""
                        }
                      />
                    ) : (
                      <div className="image">DRAFT</div>
                    )}
                    <div className="project-content">
                      <div className="category">{p.header.category}</div>
                      <div className="heading">{p.header.heading}</div>
                      <div className="brief">{p.brief}</div>
                    </div>
                    {isEditView && p.isUploaded && window.screen.width > 600 && (
                      <div className="enable-share">
                        <button
                          onClick={(e) => {
                            updateProjectIsEnabled(p._id);
                            e.stopPropagation();
                          }}
                          className={p.isEnabled ? "enabled" : "disabled"}
                        >
                          <div className="circle"></div>
                        </button>
                        <FontAwesomeIcon
                          onClick={(e) => {
                            shareWebsite(p._id);
                            e.stopPropagation();
                          }}
                          className="share-icon"
                          icon={faShare}
                        />
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
        <div className="dots">
          {[...Array(1 + totalPagesLastIndex).keys()].map((i) => (
            <div
              key={i}
              onClick={() => setActivePage(i)}
              className={`dot-${i}${i === activePage ? " active" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileProjects;
