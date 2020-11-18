import React from "react";
import "./css/CourseMain.css";
import ai from "./img/ai.png";
import pk from "./img/practicalknowledge.png";
import brightcareer from "./img/brightcareer.png";
import pl from "./img/playfullearning.png";
import lt from "./img/logicthinking.png";

const CourseMain = () => {
  return (
    <>
      <div className="coursepage-main row mx-0">
        <div className="course-main-text">
          <h3 className="course-main-title">
            You can become the next Tech Genius!
          </h3>
          <hr />
          <p className="course-main-desc">
            Check out our courses on Programming, Robotics, and Artificial
            Intelligence for students of Grades 6-12. Each course is curated and
            customized based on the student’s needs and interests.
          </p>
        </div>
        <div className="course-main-illustrations">
          <div className="row mx-0">
            <div className="course-illustration-section">
              <img src={lt} alt="" />
              <h3 className="course-main-image">Fun Learning</h3>
            </div>
            <div className="course-illustration-section">
              <img src={pl} alt="" />
              <h3 className="course-main-image">Logical Thinking</h3>
            </div>
          </div>
          <div className="row mx-0">
            <div className="course-illustration-section">
              <img src={pk} alt="" />
              <h3 className="course-main-image">Practical Education</h3>
            </div>
            <div className="course-illustration-section">
              <img src={brightcareer} alt="" />
              <h3 className="course-main-image">Bright Career</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseMain;
