import React from "react";
import "./css/WorkshopCards.css";
import "./css/WorkshopLearn.css";
import basicCodingIcon from "../Courses/img/aijourney1.png";
import brainIcon from "../Courses/img/aijourney2.png";
import aiIcon from "../Courses/img/aijourney3.png";
import arduinoIcon from "./img/Group 2311@2x.png";
import roboticsIcon from "./img/Group 2321@2x.png";

const WorkshopCardData = [
  {
    title: "Basic Coding",
    src: basicCodingIcon,
  },
  {
    title: "ML Models & working",
    src: brainIcon,
  },
  {
    title: "Basics of Arduino",
    src: arduinoIcon,
  },
  {
    title: "Robotics",
    src: roboticsIcon,
  },
  {
    title: "Artificial Intelligence",
    src: aiIcon,
  },
];

function contentItem(item) {
  return <li>{item}</li>;
}

function DesktopCardItem(cardData) {
  return (
    <div className="learn__singleCard">
      <img src={cardData.src}></img>
      <h3>{cardData.title}</h3>
    </div>
  );
}

function MobileCardItem(cardData) {
  return (
    <div className="learn__singleCard learn__mobile__singleCard">
      <img src={cardData.src}></img>
      <h3>{cardData.title}</h3>
    </div>
  );
}

function WorkshopLearn() {
  return (
    <div className="Workshop-cards">
      <div className="desktop-learn-title info-title ">
        What students will Learn?
      </div>
      <div className="Mobilecards">{WorkshopCardData.map(MobileCardItem)}</div>
      <div className="desktopLearnCards">
        {WorkshopCardData.map(DesktopCardItem)}
      </div>
    </div>
  );
}

export default WorkshopLearn;
