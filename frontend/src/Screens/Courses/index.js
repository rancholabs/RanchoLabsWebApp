import React, { useEffect, useState } from "react";
import CoursesDrivingFuture from "./CoursesDrivingFuture";
import CoursesGrade from "./CoursesGrade";
import CoursesCourses from "./CoursesCourses";
import CoursesDetails from "./CoursesDetails";
import CoursesDetailedList from "./CoursesDetailedList";
import CoursesMain from "./CoursesMain";
import CoursesBanner from "./CoursesBanner";
import CoursesLearn from "./CoursesLearn";
import CoursesInstructors from "./CoursesInstructors";
import CoursesGrowth from "./CoursesGrowth";
import CoursesFaq from "./CoursesFaq";
import CoursesTestimonials from "./CoursesTestimonials";
import CoursesProjects from "./CoursesProjects";
import "./css/index.css";
import Robotics from "./img/robotics.png";
import Programming from "./img/programming.png";
import AI from "./img/ai.png";
import RoboticsCurriculum from "./../files/RoboticsCurriculum.pdf";
import AICurriculum from "./../files/AICurriculum.pdf";

import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  courseActiveGroupsList,
  courseGroupsList,
} from "../../Actions/courseActions";

import purpleBlurBG from "../../Asssets/purpleBlurBG.svg";

const Courses = () => {
  //const [grades, setGrades] = useState([])
  //const [activeGrade, setActiveGrade] = useState(undefined)
  //const [courseGroups, setCourseGroups] = useState([])
  //const [activeCourseGroups, setActiveCourseGroups] = useState([])
  const [state, setState] = useState({
    grades: [],
    activeGrade: { minG: 6, maxG: 8 },
    activeCourseG: undefined,
    activeCourseGroups: [],
  });
  const { grades, activeGrade, activeCourseGroups, activeCourseG } = state;
  const { courseGroupsList: courseGroups } = useSelector(
    (state) => state.courseGroupsList
  );
  const setActiveGrade = (activeGrade) => {
    setState((prevState) => {
      return {
        ...prevState,
        activeCourseG:
          activeGrade.minG === 6 && activeGrade.maxG === 8
            ? courseGroups.filter((cg) => cg.name === "Recommended")[0]
            : activeCourseG,
        activeGrade: activeGrade,
      };
    });
  };
  console.log(activeCourseG);
  const setActiveCourseG = (activeCourseG) => {
    setState((prevState) => {
      return {
        ...prevState,
        activeCourseG: activeCourseG,
      };
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(courseGroupsList());
  }, []);
  useEffect(() => {
    const rCourses = courseGroups.flatMap((courseGroup) => courseGroup.courses);
    const rGrades = [
      ...new Set(rCourses.map((course) => JSON.stringify(course.gradeRange))),
    ]
      .map((grade) => JSON.parse(grade))
      .sort((a, b) => (a.minG > b.minG ? 1 : b.minG > a.minG ? -1 : 0));
    const defaultCourseG = courseGroups.filter(
      (cg) => cg.name === "Recommended"
    );
    setState((prevState) => {
      return {
        ...prevState,
        grades: rGrades,
        activeCourseGroups: courseGroups.sort((a, b) =>
          a._id > b._id ? 1 : b._id > a._id ? -1 : 0
        ),
        activeCourseG: defaultCourseG.length ? defaultCourseG[0] : null,
        // activeGrade: rGrades.length ? rGrades[0] : undefined,
      };
    });
  }, [courseGroups]);

  useEffect(() => {
    if (activeGrade) {
      const getData = async () => {
        const data = await courseActiveGroupsList();

        const rCourseGroups = data.map((courseGroup) => {
          courseGroup.courses = courseGroup.courses.filter((course) => {
            if (
              JSON.stringify(course.gradeRange) === JSON.stringify(activeGrade)
            )
              return course;
          });
          return courseGroup;
        });
        setState((prevState) => {
          return {
            ...prevState,
            activeCourseGroups: rCourseGroups.sort((a, b) =>
              a._id > b._id ? 1 : b._id > a._id ? -1 : 0
            ),
          };
        });
      };

      getData();
    }
  }, [activeGrade]);

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
        id: 1,
        name: "ROBOTICS",
        img: Robotics,
        curriculum: RoboticsCurriculum,
        details: [
          {
            name: "Robotics & Programming",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
          {
            name: "Robotics & Programming",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
          {
            name: "Robotics & Programming",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
        ],
      },
      {
        id: 2,
        name: "PROGRAMMING",
        img: Programming,
        curriculum: "",
        details: [
          {
            name: "Programming",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
          {
            name: "Programming",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
          {
            name: "Programming",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
        ],
      },
      {
        id: 3,
        name: "ARTIFICIAL INTELLIGENCE",
        img: AI,
        curriculum: AICurriculum,
        details: [
          {
            name: "Artificial Intelligence",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
          {
            name: "Artificial Intelligence",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
          {
            name: "Artificial Intelligence",
            grade: {
              minG: 8,
              maxG: 10,
            },
            durationInhours: 15,
            outcomes: [
              {
                topic: "LEARN",
                subtopics: ["Programming", "Electrical", "Mechanical"],
              },
              {
                topic: "BUILD",
                subtopics: [
                  "Calculator",
                  "Diwali lights",
                  "Traffic light controller",
                ],
              },
              {
                topic: "INNOVATE",
                subtopics: ["Calculator"],
              },
            ],
            price: {
              currency: "₹",
              amount: "4999",
            },
          },
        ],
      },
      /*{
                id: 4,
                name: 'CHECKING',
                img: Robotics,
                details: [
                    {
                        name: 'Checking',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currencyType: '₹',
                            currency: '4999'
                        }
                    },
                    {
                        name: 'Checking',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currencyType: '₹',
                            currency: '4999'
                        }
                    },
                    {
                        name: 'Checking',
                        grade: {
                            minG: 8,
                            maxG: 10
                        },
                        durationInhours: 15,
                        outcomes: [
                            {
                                topic: 'LEARN',
                                subtopics: [
                                    'Programming',
                                    'Electrical',
                                    'Mechanical'
                                ]
                            },
                            {
                                topic: 'BUILD',
                                subtopics: [
                                    'Calculator',
                                    'Diwali lights',
                                    'Traffic light controller'
                                ]
                            },
                            {
                                topic: 'INNOVATE',
                                subtopics: [
                                    'Calculator'
                                ]
                            }
                        ],
                        price: {
                            currencyType: '₹',
                            currency: '4999'
                        }
                    }
                ]
            },*/
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
      <CoursesMain />
      <CoursesGrade
        // grades={grades}
        activeGrade={activeGrade}
        grades={[
          { minG: 6, maxG: 8 },
          { minG: 9, maxG: 12 },
        ]}
        // activeGrade={{ minG: 6, maxG: 8 }}
        setActiveGrade={setActiveGrade}
      />
      <CoursesCourses
        activeGrade={activeGrade}
        courseGroups={courseGroups}
        setActiveCourseG={setActiveCourseG}
        activeCourseG={activeCourseG}
      />
      <div className="course-purple-bg-container">
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-top-left"
        ></img>
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-bottom-right"
        ></img>
        <CoursesDetails
          activeCourseG={activeCourseG}
          activeGrade={activeGrade}
        />
        <CoursesDetailedList
          courseGroups={activeCourseGroups}
          activeCourseG={activeCourseG}
          activeGrade={activeGrade}
        />
      </div>
      <CoursesBanner />
      <CoursesLearn />
      <CoursesInstructors />
      <CoursesTestimonials />
      <CoursesProjects />
      <CoursesGrowth />
      <CoursesFaq />
      {/* <CoursesDrivingFuture /> */}
      {/* <CoursesList courses={courses.courses} /> */}
    </div>
  );
};

export default Courses;
