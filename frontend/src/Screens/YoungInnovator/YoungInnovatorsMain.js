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
            An early start for your child’s better future. A one-of-a-kind novel program  to awaken 100 young innovators from all around India.
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
