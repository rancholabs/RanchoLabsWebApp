import React from "react";
import "./css/CoursesBanner.css";
import banner from "./img/banner.png";
import calendar from "./img/calendar.png";

const CoursesBanner = () => {
  return (
    <>
      <div className="courses-banner">
        <div className="courses-banner-title">
          Customize Your Learning Journey
        </div>
        <div className="courses-banner-desc">
          Our dedicated and passionate teachers will help you build a custom
          path based on your child’s interest and performance.
        </div>
        <div className="banner-button text-center">
          <button
            onClick={() =>
              (window.location.href = "/freeclass?loginfor=freeclass")
            }
          >
            <img src={calendar} alt="calendar" /> Book A Free Class Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CoursesBanner;
