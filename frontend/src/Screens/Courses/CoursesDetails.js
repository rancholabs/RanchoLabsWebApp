import React from "react";
import "./css/CoursesCourses.css";
import robotics from "./img/robotics2.png";
import ai from "./img/ai2.png";
import Workshop from "./img/workshop.png";
import arduino from "./img/arduino.png";
import iot from "./img/iot.png";
import drone from "./img/drone.png";
import innovation from "./img/innovation.png";
import brain from "./img/brain.png";
import python from "./img/python.png";
import ai2 from "./img/ai2.png";
import orangecircle from "./img/orangecircle.png";
import "./css/CoursesDetails.css";
import journeyTopLeft from "../../Asssets/journeyTopLeft.png";

const courseGroups = [
  {
    name: "ROBOTICS",
    journey: [
      {
        title: "Free Workshop",
        image: Workshop,
        classes: 2,
      },
      {
        title: "Arduino Programing",
        image: arduino,
        classes: 12,
      },
      {
        title: `Internet of Things`,
        image: iot,
        classes: 12,
      },
      {
        title: "Drone Building and Computer Vision",
        image: drone,
        classes: 12,
      },
      {
        title: "Innovation Project",
        image: innovation,
        classes: 12,
      },
    ],
  },
  {
    name: "PROGRAMMING",
    journey: [
      {
        title: "Free Workshop",
        image: Workshop,
        classes: 2,
      },
      {
        title: "Arduino Programing",
        image: arduino,
        classes: 12,
      },
      {
        title: `Internet of Things`,
        image: iot,
        classes: 12,
      },
      {
        title: "Drone Building and Computer Vision",
        image: drone,
        classes: 12,
      },
      {
        title: "Innovation Project",
        image: innovation,
        classes: 12,
      },
    ],
  },
  {
    name: "ARTIFICIAL INTELLIGENCE",
    journey: [
      {
        title: "Free Workshop",
        image: Workshop,
        classes: 2,
      },
      {
        title: "Python Programming",
        image: python,
        classes: 12,
      },
      {
        title: `Machine Learning`,
        image: ai,
        classes: 12,
      },
      {
        title: "ML and Neural Networks",
        image: brain,
        classes: 12,
      },
      {
        title: "Innovation Project",
        image: innovation,
        classes: 12,
      },
    ],
  },
];

const Mstepcard = (props) => {
  return (
    <div className="step-card">
      <div className="step-card-img">
        <img src={props.image} className="img-fluid" />
      </div>
      <div className="align-self-center">
        <div className="step-card-title">{props.title}</div>
        <div className="mno-of-classes text-center">
          {props.no_of_classes ? props.no_of_classes : props.classes} Classes
        </div>
      </div>
    </div>
  );
};

const MStepCards = ({ activeCourseG }) => {
  return (
    <>
      <div className="mstepcards">
        <div className="row mx-0">
          <div className="col mlines">
            <div className="mline">
              <div className="circle">
                <img src={orangecircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={orangecircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={orangecircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={orangecircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={orangecircle} alt="" />
              </div>
            </div>
          </div>
          <div className="step-cards col mx-0">
            {activeCourseG?.name == "Robotics"
              ? courseGroups[0].journey.map(Mstepcard)
              : activeCourseG?.name == "Programming"
              ? courseGroups[1].journey.map(Mstepcard)
              : activeCourseG?.name == "Artificial Intelligence"
              ? courseGroups[2].journey.map(Mstepcard)
              : activeCourseG?.journey?.map(Mstepcard)}
          </div>
        </div>
      </div>
    </>
  );
};

const Stepcard = (props) => {
  return (
    <div className="step-card">
      <div className="step-card-img">
        <img src={props.image} className="img-fluid" />
      </div>
      <div className="step-card-title">{props.title}</div>
    </div>
  );
};

const Stepcards = ({ activeCourseG }) => {
  return (
    <>
      <div className="step-cards row mx-0">
        {activeCourseG?.name == "Robotics"
          ? courseGroups[0].journey.map(Stepcard)
          : activeCourseG?.name == "Programming"
          ? courseGroups[1].journey.map(Stepcard)
          : activeCourseG?.name == "Artificial Intelligence"
          ? courseGroups[2].journey.map(Stepcard)
          : activeCourseG?.journey?.map(Stepcard)}
      </div>
      <div
        className="row mx-0 line-circle"
        style={{ justifyContent: "space-between", width: "100%" }}
      >
        <div className="line">
          <div className="circle">
            <img src={orangecircle} alt="" />
          </div>
        </div>
        <div className="line">
          <div className="circle">
            <img src={orangecircle} alt="" />
          </div>
        </div>
        <div className="line">
          <div className="circle">
            <img src={orangecircle} alt="" />
          </div>
        </div>
        <div className="line">
          <div className="circle">
            <img src={orangecircle} alt="" />
          </div>
        </div>
        <div className="line">
          <div className="circle">
            <img src={orangecircle} alt="" />
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div
        className="row mx-0 no-of-classes"
        style={{ justifyContent: "space-around", width: "100%" }}
      >
        {activeCourseG?.journey?.map((c) => {
          return (
            <>
              <div>{c.no_of_classes} Classes</div>
            </>
          );
        })}
      </div>
    </>
  );
};

const CoursesDetails = ({ activeCourseG, activeGrade }) => {
  return (
    <>
      <div className="course-details">
        {/* <img
          src={journeyTopLeft}
          className="course-details-illustration-top-left"
        ></img> */}
        <div className="course-details-title">
          {activeCourseG?.name} journey path for grade{" "}
          {activeGrade?.minG + "-" + activeGrade?.maxG}
        </div>
        <div className="m-journey">
          <MStepCards course="ROBOTICS" activeCourseG={activeCourseG} />
        </div>
        <div className="d-journey">
          <Stepcards course="ROBOTICS" activeCourseG={activeCourseG} />
        </div>
      </div>
    </>
  );
};

export default CoursesDetails;
