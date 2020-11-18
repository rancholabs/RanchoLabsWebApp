import React from "react";
import "./css/CoursesLearn.css";
import b1 from "./img/b1.png";
import b2 from "./img/b2.png";
import b3 from "./img/b3.png";
import b4 from "./img/b4.png";

const courseLearns = [
  {
    image: b1,
    title: "Live & Interactive Classes",
    desc:
      "One on one live classes from teachers who provide you a near classroom experience.",
  },
  {
    image: b4,
    title: "Real-life problem solving",
    desc: "Students apply the acquired skills to solve a real-life problem.",
  },
  {
    image: b2,
    title: "Customized & convenient Education",
    desc: "Learn at your own pace, from the comfort of your home.",
  },
  {
    image: b3,
    title: "Project-based active Learning",
    desc:
      "The course is integrated with live projects that the students build.",
  },
];

const CoursesLearn = () => {
  return (
    <>
      <div className="courses-learn">
        <div className="courses-learn-title">Why learn with Rancho Labs?</div>
        <div className="row mx-0">
          {courseLearns.map((cl) => {
            return (
              <>
                <div className="learn-item row mx-0">
                  <div className="learn-image">
                    <img src={cl.image} className="img-fluid" alt="image" />
                  </div>
                  <div className="learn-details">
                    <div className="learn-title">{cl.title}</div>
                    <div className="learn-desc">{cl.desc}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CoursesLearn;
