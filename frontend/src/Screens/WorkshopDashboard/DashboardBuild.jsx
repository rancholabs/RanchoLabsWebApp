import React from "react";
import "./css/DashboardBuild.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import lock from "./img/lock.svg";
import axios from "axios";

function DeadlineOver(deadline) {
  var d = new Date().toISOString;
  return deadline < d ? true : false;
}

function getDeadline(deadline) {
  var d = new Date().toISOString;
  var dline = deadline < d ? "Over" : deadline;
  return dline;
}

function ProjectItemDesk(projectItem) {
  var DeadlineOver = false;
  var SubmissionOver = false;
  console.log(projectItem.singleProject);

  if (projectItem.singleProject) {
    return (
      <div className="project-item">
        <div className="row">
          <div className="col-5 pr-0 pl-1">
            <div className="project-no">
              Project {projectItem.singleProject.no}
            </div>
          </div>
          <div className="col-7 pl-0 align-self-center">
            <div className="deadline text-right p-0">
              Deadline: {getDeadline(projectItem.singleProject.deadline)}
            </div>
          </div>
        </div>
        <div>
          <img
            className=""
            src={projectItem.singleProject.image.filePath}
            alt={projectItem.singleProject.name}
            style={{
              padding: "1vw",
              height: "10vw",
              width: "100%",
              borderRadius: "50%",
            }}
          ></img>
        </div>
        <div className="project-name">{projectItem.singleProject.name}</div>
        <div
          className="row"
          style={{ marginTop: "3.5vw", justifyContent: "space-evenly" }}
        >
          {DeadlineOver ? (
            <div className="startbuilding">
              <button>View Submission</button>
            </div>
          ) : (
            <>
              {SubmissionOver ? (
                <>
                  <div className="startbuilding">
                    <button>Start Building</button>
                  </div>
                  <div className="editsub">
                    <button>Edit submission</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="startbuilding">
                    <button>Start Building</button>
                  </div>
                  <div className="submitbuild">
                    <button>SUBMIT</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  } else return null;
}

const ProjectItemMob = (projectItem) => {
  var DeadlineOver = false;
  var SubmissionOver = false;

  return (
    <div className="row">
      <div className="col-5 align-self-center">
        <img
          className="img-src"
          src={projectItem.singleProject?.image?.filePath}
          alt={projectItem.singleProject?.name}
          style={{ borderRadius: "40vw" }}
        ></img>
      </div>
      <div className="col-7" style={{ padding: "0 0 0 10px" }}>
        <div className="project-no">
          Project {projectItem.singleProject?.no}
        </div>
        <div className="deadline">
          Deadline: {getDeadline(projectItem.singleProject?.deadline)}
        </div>
        <div className="projectname">{projectItem.singleProject?.name}</div>
        <div
          className="row mx-0"
          style={{ marginTop: "1rem", justifyContent: "space-around" }}
        >
          <div
            className="row"
            style={{
              marginTop: "1.5vw",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {!DeadlineOver ? (
              <div className="startbuilding">
                <button>View Submission</button>
              </div>
            ) : (
              <>
                {!SubmissionOver ? (
                  <>
                    <div className="startbuilding">
                      <button>Start Building</button>
                    </div>
                    <div className="editsub">
                      <button>Edit submission</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="startbuilding">
                      <button>Start Building</button>
                    </div>
                    <div className="submitbuild">
                      <button>SUBMIT</button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function Lockhover() {
  return (
    <div className="hoverlock">
      <div className="lock-msg">
        Unlock this feature by enrolling in our courses and build your projects
        step by step
      </div>
    </div>
  );
}

const DashboardBuildMobile = (props) => {
  var Dbuild = props.data;
  return (
    <div className="card buildcardmobile">
      <div className="dproject">
        {Dbuild ? (
          Dbuild.batch.batchType === "normal" ? (
            Dbuild.projects.map((proj) => {
              return (
                <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop>
                  <ProjectItemMob singleProject={proj} />
                </Carousel>
              );
            })
          ) : (
            <ProjectItemMob singleProject={Dbuild.projects[0]} />
          )
        ) : (
          <>
            <div className="text-center lock" style={{ margin: "auto" }}>
              <img
                src={lock}
                alt="locked"
                className="img-fluid"
                style={{ margin: "auto", width: "20%" }}
              ></img>
              <Lockhover />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function DashboardBuildCard(props) {
  var Dbuild = props.data;
  console.log(props);

  return (
    <div
      className="card buildcard"
      style={{ padding: "1.8vw", float: "right" }}
    >
      {Dbuild ? (
        <div className="dproject align-self-center">
          <>
            {Dbuild.batch.batchType === "normal" ? (
              Dbuild.projects.map((proj) => {
                return (
                  <Carousel
                    emulateTouch
                    swipeable
                    useKeyboardArrows
                    infiniteLoop
                  >
                    <ProjectItemDesk singleProject={proj} />
                  </Carousel>
                );
              })
            ) : Dbuild.batch.batchType === "freeclass" ? (
              <ProjectItemDesk singleProject={Dbuild.projects[0]} />
            ) : (
              <>
                <Carousel emulateTouch swipeable useKeyboardArrows infiniteLoop>
                  <ProjectItemDesk singleProject={Dbuild.projects[0]} />
                  <ProjectItemDesk singleProject={Dbuild.projects[1]} />
                </Carousel>
              </>
            )}
          </>
        </div>
      ) : (
        <>
          <div className="text-center lock" style={{ margin: "auto" }}>
            <img
              src={lock}
              alt="locked"
              className="img-fluid"
              style={{ margin: "auto", width: "6.56vw" }}
            ></img>
            <Lockhover />
          </div>
        </>
      )}
    </div>
  );
}

const DashboardBuild = (props) => {
  var Dbuild = props.build;
  console.log(Dbuild);

  return (
    <div>
      <DashboardBuildCard data={Dbuild} />
      <DashboardBuildMobile data={Dbuild} />
    </div>
  );
};

export default DashboardBuild;
