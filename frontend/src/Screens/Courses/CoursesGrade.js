import React, { useEffect, useState } from "react";
import "./css/CoursesGrade.css";

const CourseGradeItem = ({ grade, isActive, clickHandler }) => {
  const { minG, maxG } = grade;
  return (
    <div
      className={`courses-grade-item ${isActive ? " active" : ""}`}
      onClick={() => (!isActive ? clickHandler(grade) : "")}
    >
      <div className="text">
        GRADE {minG} - {maxG}
      </div>
    </div>
  );
};

const CoursesGrade = ({ grades, activeGrade, setActiveGrade }) => {
  const onclickHandler = (grade) => {
    setActiveGrade(grade);
  };
  console.log(grades, activeGrade);
  return (
    <div className="courses-grade">
      <div className="title">select your grade</div>
      <div className="grades">
        {grades
          .sort((a, b) => (a.minG > b.minG ? 1 : b.minG > a.minG ? -1 : 0))
          .map((grade, gi) => {
            return (
              <CourseGradeItem
                key={gi}
                isActive={
                  activeGrade &&
                  grade.minG === activeGrade.minG &&
                  grade.maxG === activeGrade.maxG
                }
                grade={grade}
                clickHandler={onclickHandler}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CoursesGrade;
