import React from "react";
import { useLayoutEffect } from "react-dom";
import "./css/WorkshopMain.css";
import w1 from "./img/w1.png";
import w2 from "./img/w2.png";
import $ from "jquery";
import workshop from "./img/workshop.jpg";
import workshopimg from "./img/logo.png";
import { useState } from "react";

function MobileCard(props) {
  let srce;

  if (props.cardname === "c1") {
    srce = w1;
  } else if (props.cardname === "c2") {
    srce = w2;
  } else if (props.cardname === "c3") {
    srce = w2;
  }

  return (
    <div className="card">
      <div className="row">
        <div className="col-5" style={{ paddingLeft: "2vw" }}>
          <img className="img-fluid" src={srce} />
          <div className="card-title text-center">Day 1 &nbsp;</div>
        </div>
        <div className="col-7" style={{ paddingLeft: "2vw" }}>
          <ul className="dashed">
            <li>Introduction to Robotics and AI </li>
            <li>Arduino and its programming</li>
            <li>Project: Diwali Lights</li>
            <li>Project: Traffic Light Controller</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Main() {
  const [position, setPosition] = useState("fixed");
  React.useLayoutEffect(() => {
    var pos = $(".Workshop-info").offset().top;
    console.log(pos);

    $.fn.followTo = function () {
      var $this = this,
        $window = $(window);

      $window.scroll(function (e) {
        if ($window.scrollTop() > pos / 2) {
          console.log("yes");
          $this.css({
            position: "absolute",
            top: pos / 2,
          });
        } else {
          $this.css({
            position: "fixed",
            top: "inherit",
          });
        }
      });
    };

    $("#video").followTo(pos);
  }, []);

  return (
    <div className="WorkshopMain">
      <div className="row">
        <div className="col-md-7">
          <div className="Workshop-title">Coding, Robotics & AI Workshop</div>
          <div className="Workshop-subtitle">
            A free workshop in Robotics for school students,{" "}
            <span id="IITians">by IITians</span>
          </div>
          <div className="Workshop-details">
            <ul type="none">
              <li className="border-right">Beginners Level</li>
              <li className="border-right">Pre-Req: None</li>
              <li>2 Days</li>
            </ul>
          </div>
          <a href="#batches">
            <div className="btn enroll">ENROLL NOW</div>
          </a>
        </div>
        <div className="col-md-5" style={{ padding: "0" }}>
          <div id="video">
            <img className="img-fluid" src={workshop} alt=""></img>
            {/* <div class="embed-responsive embed-responsive-16by9" style={{ height: "76%", width: "auto" }}> */}
            {/* <iframe class="embed-responsive-item" src="" allowfullscreen></iframe>
                        {/* /* <iframe width="100%" height="auto" src="https://www.youtube.com/embed/fEErySYqItI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen></iframe> */}
            {/* </div> */}
            {/* <span id="robo-video"><p>Robotics Video</p></span> */}
          </div>
        </div>
      </div>
      <div className="Workshop-info">
        <div className="row">
          <div className="col-md-6">
            {/* <div className="info-title">Robotics</div>
                        <div className="info-content">Robotics is fundamentally a branch of technology that deals with the design,
                        construction, operation, and application of robots. It is a powerful tool to understand the basic concepts
                        of Computer Science, Mechanical engineering, and Electronics engineering.</div> */}
            <div className="info-title">Workshop Overview</div>
            <div className="info-content">
              Two days program specially designed for school students of class
              8th to 10th to create a strong foundation in Robotics & AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
