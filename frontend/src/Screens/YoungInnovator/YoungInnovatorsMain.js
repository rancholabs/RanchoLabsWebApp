import React from "react";
import "../Courses/css/CourseMain.css";
import "./css/YoungInnovatorsMain.css";
import mainImg from "./img/Group 2419@2x.png";

const YoungInnovatorsMain = () => {
  return (
    <>
      <div className="coursepage-main  row mx-0">
        <div className="course-main-text youngInnovators-main-text">
          <h3 className="course-main-title">
            Young Innovators <br /> Program
          </h3>
          <hr />
          <p className="course-main-desc">
            A 5-week experiential program for grades 6th to 10th focused on
            technology and innovation with a unique methodology of Learn, Build,
            and Innovate conducted by IITians.
          </p>
        </div>
        <div className="youngInnovators-main-illustrations">
          <img src={mainImg}></img>
        </div>
      </div>
    </>
  );
};

export default YoungInnovatorsMain;
