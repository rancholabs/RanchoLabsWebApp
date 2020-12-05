import React from "react";
import "./css/WorkshopCards.css";
import "./css/WorkshopLearn.css";
import ledBlinkingIcon from "./img/Group 2324@2x.png";
import diwaliIcon from "./img/Group 2323@2x.png";
import trafficLightIcon from "./img/Group 2322@2x.png";
import faceRecogIcon from "./img/Group@2x.png";

const WorkshopCardData = [
  {
    title: "LED Blinking",
    src: ledBlinkingIcon,
  },
  {
    title: "Diwali Lights",
    src: diwaliIcon,
  },
  {
    title: "Traffic Light Controller",
    src: trafficLightIcon,
  },
  {
    title: "Face Recognition",
    src: faceRecogIcon,
  },
];

function contentItem(item) {
  return <li>{item}</li>;
}

function DesktopCardItem(cardData) {
  return (
    <div className="learn__singleCard build__singleCard">
      <img src={cardData.src}></img>
      <h3>{cardData.title}</h3>
    </div>
  );
}

function MobileCardItem(cardData) {
  return (
    <div className="learn__singleCard build__singleCard learn__mobile__singleCard">
      <img src={cardData.src}></img>
      <h3>{cardData.title}</h3>
    </div>
  );
}

function WorkshopBuild() {
  return (
    <div className="Workshop-cards">
      <div className="desktop-learn-title info-title ">
        What students will Build?
      </div>
      <div className="Mobilecards">{WorkshopCardData.map(MobileCardItem)}</div>
      <div className="desktopLearnCards">
        {WorkshopCardData.map(DesktopCardItem)}
      </div>
    </div>
  );
}

export default WorkshopBuild;
