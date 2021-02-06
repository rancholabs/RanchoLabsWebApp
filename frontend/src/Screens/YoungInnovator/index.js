import React, { useEffect, useState } from "react";
// import CoursesDrivingFuture from "../Courses/CoursesDrivingFuture";
// import CoursesGrade from "../Courses/CoursesGrade";
import CoursesDetailedList from "../Courses/CoursesDetailedList";
import YoungInnovatorsMain from "./YoungInnovatorsMain";
import YoungInnovatorsWhy from "./YoungInnovatorWhy";
import YoungInnovatorVideo from "./YoungInnovatorVideo";
import YoungInnovatorMethodology from "./YoungInnovatorMethodology";
import YoungInnovatorCards from "./YoungInnovatorCards";
import YoungInnovatorEnroll from "./YoungInnovatorEnroll";
import YoungInnovatorSpeciallyDesigned from "./YoungInnovatorSpeciallyDesigned";
import AbouUsGallery from "../AboutUs/AboutUsGallery";
// import "../AboutUs/css/AboutUsGallery";
import YoungInnovatorBanner from "./YoungInnovatorBanner";
import CoursesBanner from "../Courses/CoursesBanner";
import CoursesLearn from "../Courses/CoursesLearn";
import CoursesInstructors from "../Courses/CoursesInstructors";
import CoursesGrowth from "../Courses/CoursesGrowth";
import CoursesFaq from "../Courses/CoursesFaq";
import CoursesTestimonials from "../Courses/CoursesTestimonials";
import CoursesProjects from "../Courses/CoursesProjects";
import "../Courses/css/index.css";
import "../Courses/css/CoursesInstructors.css";
import "../Courses/css/CoursesProjects.css";
import iitd from "../Courses/img/iitd.png";
import iitb from "../Courses/img/iitb.png";
import DroneStark_white from "../Courses/img/DroneStark_white.png";
import google from "../Courses/img/google.png";
import RohanYutthamInstructor from "../Courses/img/RohanYutthamInstructor.png";
import Anshul from "../AboutUs/img/Anshul.png";
import Aman from "../AboutUs/img/Aman.jpg";
import KaashikaPhotoInstructor from "../Courses/img/KaashikaPhotoInstructor.png";

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
        durationInhours: 10,
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
        durationInhours: 10,
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
        durationInhours: 4,
        outcomesByTopics: [
          {
            topic: "Innovation Project",
            subtopics: [
              "Think of a real-life problem.",
              "Address the concerns.",
              "Expanding critical thinking skills.",
              "Develop a solution with your team to solve the problem"

            ],
          },
        ],
        price: {
          currency: "₹",
          amount: "4999",
        },
        totalClasses: 6,
      },
      [
        {
          name: "Week 1-2",
          gradeRange: {
            minG: 8,
            maxG: 10,
          },
          durationInhours: 10,
          outcomesByTopics: [
            {
              topic: "LEARN",
              subtopics: ["Logic and coding", "Sensors and Motors"],
            },
            {
              topic: "BUILD",
              subtopics: ["Social Distancing Project", "Automated Door"],
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
          durationInhours: 10,
          outcomesByTopics: [
            {
              topic: "LEARN",
              subtopics: ["Loops and Function", "LCD and Keypad"],
            },
            {
              topic: "BUILD",
              subtopics: ["Obstacle Avoiding Robot", "Calculator"],
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
          durationInhours: 4,
          outcomesByTopics: [
            {
              topic: "Innovation Project",
              subtopics: [
                "Think of a real life problem",
                "Address the concerns.",
                "Expanding critical thinking skills.",
                "Develop a solution with your team to solve the problem",
              ],
            },
          ],
          price: {
            currency: "₹",
            amount: "4999",
          },
          totalClasses: 6,
        }
      ]
    ],
  };

  const instructors = [
    {
      id: 1,
      name: "Rohan Yuttham",
      details: `<p>Overall Coordinator Robotics Club, IIT Delhi. <br/> Robotics and Automation Expert. </p>`,
      logo1: iitd,
      logo2: google,
      image: RohanYutthamInstructor,
      logoDesc: "IIT Delhi",
    },
    {
      id: 2,
      name: "Aman Kumar",
      details: `<p>Co-Founder - Rancho Labs
       <br/> Chemical Engineer, IIT Delhi </p>`,
      logo1: iitd,
      logo2: google,
      image: Aman,
      logoDesc: "IIT Delhi",
    },
    {
      id: 3,
      name: "Kaashika Prajaapat",
      details:
        "<p>Computer Science Engineer, IIT Delhi.<br/> Artificial Intelligence Expert. </p>",
      logo1: iitd,
      logo2: google,
      image: KaashikaPhotoInstructor,
      logoDesc: "IIT Delhi",
    },
    {
      id: 4,
      name: "Anshul Agrawal",
      details:
        "<p>Co-Founder - Rancho Labs<br/> Mechanical Engineer, IIT Delhi </p>",
      logo1: iitd,
      logo2: google,
      image: Anshul,
      logoDesc: "IIT Delhi",
    },
  ];

  return (
    <div className="courses-main">
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
      <YoungInnovatorEnroll />
      <YoungInnovatorSpeciallyDesigned />
      <CoursesInstructors
        title="Learn From The Best In The Country"
        buttonDisplay="none"
        bgColor="#0E0234"
        allInstructors={instructors}
      />
      <CoursesProjects
        paddingBot="40px"
        title="Students with determination and enthusiasm with a pinch of learning and guidance come up with some great innovations at Rancho Labs."
      />
      <AbouUsGallery />
      <YoungInnovatorBanner />
      <CoursesFaq />
    </div>
  );
};

export default YoungInnovator;
