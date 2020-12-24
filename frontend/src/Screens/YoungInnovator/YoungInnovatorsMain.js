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
            Young Innovators <br /> Programme
          </h3>
          <hr />
          <p className="course-main-desc">
            Artificial Intelligence Refers To The Intelligence Portrayed By The
            Machines. It Is A Branch Of ‘Computer Science’ That Deals With The
            Study
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
