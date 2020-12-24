import React, { useEffect, useState } from "react";
// import CoursesDrivingFuture from "../Courses/CoursesDrivingFuture";
// import CoursesGrade from "../Courses/CoursesGrade";
import CoursesDetailedList from "../Courses/CoursesDetailedList";
import YoungInnovatorsMain from "./YoungInnovatorsMain";
import YoungInnovatorsWhy from "./YoungInnovatorWhy";
import YoungInnovatorVideo from "./YoungInnovatorVideo";
import YoungInnovatorMethodology from "./YoungInnovatorMethodology";
import YoungInnovatorCards from "./YoungInnovatorCards";
import YoungInnovatorSpeciallyDesigned from "./YoungInnovatorSpeciallyDesigned";
import YoungInnovatorBanner from "./YoungInnovatorBanner";
import CoursesBanner from "../Courses/CoursesBanner";
import CoursesLearn from "../Courses/CoursesLearn";
import CoursesInstructors from "../Courses/CoursesInstructors";
import CoursesGrowth from "../Courses/CoursesGrowth";
import CoursesFaq from "../Courses/CoursesFaq";
import CoursesTestimonials from "../Courses/CoursesTestimonials";
import CoursesProjects from "../Courses/CoursesProjects";
import "../Courses/css/index.css";
import Robotics from "../Courses/img/robotics.png";
import Programming from "../Courses/img/programming.png";
import AI from "../Courses/img/ai.png";
import RoboticsCurriculum from "../files/RoboticsCurriculum.pdf";
import AICurriculum from "../files/AICurriculum.pdf";

import { Helmet } from "react-helmet";

import purpleBlurBG from "../../Asssets/purpleBlurBG.svg";

import "./css/index.css";

const YoungInnovator = () => {
  const coursess = {
    grades: [
      {
        id: 1,
        minG: 8,
        maxG: 10,
      },
      {
        id: 2,
        minG: 11,
        maxG: 12,
      },
    ],
    courses: [
      {
        name: "Week 1-2",
        gradeRange: {
          minG: 8,
          maxG: 10,
        },
        durationInhours: 15,
        outcomesByTopics: [
          {
            topic: "LEARN",
            subtopics: ["Logic and coding", "Game development"],
          },
          {
            topic: "BUILD",
            subtopics: ["Pacman", "Angry birds", "Zoombies"],
          },
        ],
        price: {
          currency: "₹",
          amount: "4999",
        },
        totalClasses: 12,
      },
      {
        name: "Week 3-4",
        grade: {
          minG: 8,
          maxG: 10,
        },
        durationInhours: 15,
        outcomesByTopics: [
          {
            topic: "LEARN",
            subtopics: ["App development", "Designing", "Firebase integration"],
          },
          {
            topic: "BUILD",
            subtopics: ["Text Translator", "Chat Bot", "Lost and found app"],
          },
        ],
        price: {
          currency: "₹",
          amount: "4999",
        },
        totalClasses: 12,
      },
      {
        name: "Week 5",
        grade: {
          minG: 8,
          maxG: 10,
        },
        durationInhours: 15,
        outcomesByTopics: [
          {
            topic: "Innovation Project",
            subtopics: [
              "Think of a real life problem",
              "Develop a solution with your team to solve the problem",
            ],
          },
        ],
        price: {
          currency: "₹",
          amount: "4999",
        },
        totalClasses: 6,
      },
    ],
  };
  return (
    <div className="courses-main">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Course</title>
        <meta
          name="description"
          content="You can become the next Tech Genius! Check out our courses on Programming, Robotics, and Artificial Intelligence for students of Grades 6-12. Each course is curated and customized based on the student’s needs and interests."
        />
      </Helmet>
      <YoungInnovatorsMain />

      <div className="course-purple-bg-container">
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-top-left youngInnovator-purple-bg-top-left"
        ></img>
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-bottom-right youngInnovator-purple-bg-bottom-right"
        ></img>
        <YoungInnovatorsWhy />
        {/* <CoursesDetailedList
          courseGroups={coursess.courses}
        /> */}
      </div>

      <YoungInnovatorVideo />
      <div className="course-purple-bg-container">
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-top-left youngInnovator-purple-bg-top-right"
        ></img>
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-bottom-right youngInnovator-purple-bg-bottom-left"
        ></img>
        <YoungInnovatorMethodology />
        {/* <CoursesDetailedList
          courseGroups={coursess.courses}
        /> */}
      </div>

      <YoungInnovatorCards coursesDetails={coursess.courses} />
      <YoungInnovatorSpeciallyDesigned />

      <CoursesInstructors
        title="Learn From The Best In The World"
        buttonDisplay="none"
        bgColor="#0E0234"
      />
      <CoursesProjects
        paddingBot="40px"
        title="Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
      />
      <YoungInnovatorBanner />
      <CoursesFaq />
    </div>
  );
};

export default YoungInnovator;
