import React, { useState, useEffect } from "react";
import "./css/CoursesCourses.css";
import robotics from "./img/robotics2.png";
import ai from "./img/ai2.png";
import programming from "./img/programming2.png";
import recommended from "./img/recommended.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "../../Asssets/Icon feather-arrow-left.png";

const imageArray = [recommended, robotics, ai, programming];

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
  {
    name: "Programming",
    class: "",
    image: programming,
  },
  {
    name: "Programming",
    class: "",
    image: programming,
  },
  {
    name: "Programming",
    class: "",
    image: programming,
  },
  {
    name: "Programming",
    class: "",
    image: programming,
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
  const [showCenteredMode, setShowCenteredMode] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 500) setShowCenteredMode(true);
    else setShowCenteredMode(false);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 500) setShowCenteredMode(true);
      else setShowCenteredMode(false);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [showCenteredMode]);

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
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log(showCenteredMode);

  const CustomLeft = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-left"
      onClick={onClick}
    >
      <img src={ArrowBack} className="course-carousel-icon" />
    </button>
  );

  const CustomRight = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-right"
      onClick={onClick}
    >
      <img src={ArrowBack} className="course-carousel-icon" />
    </button>
  );
  let myCarousel = null;
  return (
    <>
      {/* <div className="courses-courses row mx-0"> */}
      {/* {courseGroups.map(CourseCard)} */}
      <Carousel
        ref={(el) => (myCarousel = el)}
        swipeable={showCenteredMode}
        draggable={showCenteredMode}
        // showDots={true}
        responsive={responsive}
        infinite={true}
        // autoPlay={true}
        // autoPlaySpeed={2500}
        centerMode={showCenteredMode}
        arrows={false}
        // focusOnSelect={true}
        afterChange={() =>
          setActiveCourseG(courseGroups[myCarousel?.state?.currentSlide - 2])
        }
        // customLeftArrow={showCenteredMode && <CustomLeft />}
        // customRightArrow={showCenteredMode && <CustomRight />}
        // keyBoardControl={true}
        className="courses-courses-carousel"
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
                  <img
                    src={imageArray[index] ? imageArray[index] : imageArray[0]}
                    className="img-fluid"
                    alt={course.name}
                  />
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
