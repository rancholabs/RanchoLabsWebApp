import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./css/DashboardJourney.css";
import Workshop from "./img/workshop.png";
import arduino from "./img/arduino.png";
import iot from "./img/iot.png";
import drone from "./img/drone.png";
import innovation from "./img/innovation.png";
import lock from "./img/lock.png";
import brain from "./img/brain.png";
import python from "./img/python.png";
import ai from "./img/ai.png";
import lockcircle from "./img/lockcircle.png";
import orangecircle from "./img/orangecircle.png";
import { useSelector, useDispatch } from "react-redux";
import { journeycourse } from "../../Actions/dashboardActions";

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
        classes: 36,
      },
      {
        title: "Drone Building and Computer Vision",
        image: drone,
        classes: 132,
      },
      {
        title: "Innovation Project",
        image: innovation,
        classes: 144,
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
        classes: 36,
      },
      {
        title: "Drone Building and Computer Vision",
        image: drone,
        classes: 132,
      },
      {
        title: "Innovation Project",
        image: innovation,
        classes: 144,
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
        classes: 36,
      },
      {
        title: "ML and Neural Networks",
        image: brain,
        classes: 132,
      },
      {
        title: "Innovation Project",
        image: innovation,
        classes: 144,
      },
    ],
  },
];

const Stepcard = (props) => {
  return (
    <div
      className="step-card"
      onClick={() => (window.location.href = "/courses")}
    >
      <div className="step-card-img">
        <img src={props.image} className="img-fluid" />
      </div>
      <div className="step-card-title">{props.title}</div>
    </div>
  );
};

const Mstepcard = (props) => {
  return (
    <div
      className="step-card"
      onClick={() => (window.location.href = "/courses")}
    >
      <div className="step-card-img">
        <img src={props.image} className="img-fluid" />
      </div>
      <div className="align-self-center">
        <div className="step-card-title">{props.title}</div>
        <div className="mno-of-classes text-center">
          {props.classes} Classes
        </div>
      </div>
    </div>
  );
};

const MStepCards = (props) => {
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
                <img src={lockcircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={lockcircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={lockcircle} alt="" />
              </div>
            </div>
            <div className="mline">
              <div className="circle">
                <img src={lockcircle} alt="" />
              </div>
            </div>
          </div>
          <div className="dashboarjourney step-cards col mx-0">
            {props.course.journey.map(Mstepcard)}
          </div>
        </div>
      </div>
    </>
  );
};

const DStepcards = (props) => {
  return (
    <>
      <div className="desktop">
        <div className="dashboarjourney step-cards row mx-0">
          {props.course.journey.map(Stepcard)}
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
              <img src={lockcircle} alt="" />
            </div>
          </div>
          <div className="line">
            <div className="circle">
              <img src={lockcircle} alt="" />
            </div>
          </div>
          <div className="line">
            <div className="circle">
              <img src={lockcircle} alt="" />
            </div>
          </div>
          <div className="line">
            <div className="circle">
              <img src={lockcircle} alt="" />
            </div>
          </div>
          <div className="line"></div>
        </div>
        <div
          className="row mx-0"
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          {props.course.journey.map((c) => {
            return (
              <>
                <div className="no-of-classes">{c.classes} Classes</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const DashboardJourney = () => {
  const dispatch = useDispatch();

  const JourneyCourse = useSelector((state) => state.journeycourse);

  const selected = courseGroups.filter((course) => {
    if (course.name === JourneyCourse.journeycourse) return course;
  });

  function selectGroup(group) {
    dispatch(journeycourse(group));
  }

  return (
    <>
      {JourneyCourse && (
        <>
          <div className="dashboardjourney">
            <div className="row mx-0 dj">
              <div className="row mx-0 choice-row" style={{ width: "100%" }}>
                <div className="dashboard-journey-title">
                  My Journey Path for <span>{JourneyCourse.journeycourse}</span>
                </div>
                <Dropdown>
                  <Dropdown.Toggle split id="dropdown-split-basic">
                    {JourneyCourse.journeycourse}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {courseGroups.map((group) => (
                      <>
                        <Dropdown.Item onClick={() => selectGroup(group.name)}>
                          {group.name}
                        </Dropdown.Item>
                      </>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <MStepCards course={selected[0]} />
              <DStepcards course={selected[0]} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardJourney;
