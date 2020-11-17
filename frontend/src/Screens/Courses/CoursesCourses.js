import React from "react";
import "./css/CoursesCourses.css";
import robotics from "./img/robotics2.png";
import ai from "./img/ai2.png";
import programming from "./img/programming2.png";
import recommended from "./img/recommended.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Courses = [
  {
    name: "Recommended",
    class: "",
    image: recommended,
  },
  {
    name: "Robotics",
    class: "",
    image: robotics,
  },
  {
    name: "Artificial Intelligence",
    class: "active",
    image: ai,
  },
  {
    name: "Programming",
    class: "",
    image: programming,
  },
];

const CourseCard = (props, index) => {
  return (
    <>
      <div
        className={`courses-course-card col p-0 ` + props.class}
        style={{ alignSelf: "flex-start" }}
        key={props._id}
        id={props._id}
        // onClick={() => handleActiveCourses}
      >
        <button>
          <div className="course-image">
            <img src={robotics} className="img-fluid" alt={props.name} />
          </div>
        </button>
        <div className="course-name text-center">{props.name}</div>
        <div className="active-line"></div>
      </div>
    </>
  );
};

const CoursesCourses = ({ courseGroups, activeCourseG, setActiveCourseG }) => {
  const handleActiveCourses = (course) => {
    setActiveCourseG(course);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {/* <div className="courses-courses row mx-0"> */}
      {/* {courseGroups.map(CourseCard)} */}
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        // infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={2500}
        centerMode
        // keyBoardControl={true}
      >
        {courseGroups.map((course, index) => {
          return (
            <div
              className={`courses-course-card col p-0 ${
                course._id === activeCourseG?._id ? "active" : ""
              }`}
              style={{ alignSelf: "flex-start" }}
              key={course._id}
              id={course._id}
              onClick={() => handleActiveCourses(course)}
            >
              <button>
                <div className="course-image">
                  <img src={robotics} className="img-fluid" alt={course.name} />
                </div>
              </button>
              <div className="course-name-line">
                <div className="course-name text-center">{course.name}</div>
                <div className="active-line"></div>
              </div>
            </div>
          );
        })}
      </Carousel>
      {/* </div> */}
    </>
  );
};

export default CoursesCourses;
