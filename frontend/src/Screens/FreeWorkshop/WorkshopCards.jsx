import React from "react";
import "./css/WorkshopCards.css";
import w1 from "./img/w1.png";
import w2 from "./img/w2.png";

const WorkshopCardData = [
  {
    title: "Day 1",
    src: w1,
    content: [
      "90 minutes LIVE session by IITians",
      "Introduction to Coding and Robotics",
      "Arduino and Circuits",
      "Project: Traffic Light Controller & Diwali Lights",
    ],
  },
  {
    title: "Day 2",
    src: w1,
    content: [
      "90 minutes LIVE session by IITians",
      "Introduction to AI",
      "Algorithms",
      "AI Models",
      "Project: Face Recognition",
    ],
  },
  {
    title: "Learners Outcome",
    src: w2,
    content: [
      "Learn the basics of Coding, Robotics & AI",
      "Develop projects like Traffic Light Controller & Face Recognition",
      "Certificate by Rancho Labs and eDC, IIT Delhi",
    ],
  },
];

function contentItem(item) {
  return <li>{item}</li>;
}

function DesktopCardItem(cardData) {
  return (
    <div className="col-md-4">
      <div className="card" style={{ height: "95%" }}>
        <div className="card-img-top img-fluid">
          <img
            src={cardData.src}
            style={{ width: "70%", margin: "auto", display: "flex" }}
          ></img>
        </div>
        <div className="card-body">
          <div className="card-title">{cardData.title}</div>
          <hr style={{ width: "33%", borderWidth: "3px" }}></hr>
          <div className="card-text">
            <ul className="dashed">{cardData.content.map(contentItem)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCardItem(cardData) {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="row">
          <div className="col-5">
            <img className="img-fluid" src={cardData.src}></img>
            <div className="card-title">{cardData.title} &nbsp;</div>
          </div>
          <div className="col-7">
            <ul className="dashed">{cardData.content.map(contentItem)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkshopCards() {
  return (
    <div className="Workshop-cards">
      <div className="row Mobilecards">
        {WorkshopCardData.map(MobileCardItem)}
      </div>
      <div className="info-title">Workshop Structure</div>
      <div className="row Desktopcards">
        {WorkshopCardData.map(DesktopCardItem)}
      </div>
    </div>
  );
}

export default WorkshopCards;
