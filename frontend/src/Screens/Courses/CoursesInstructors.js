import React from "react";
import "./css/CoursesInstructors.css";
import iitd from "./img/iitd.png";
import google from "./img/google.png";
import programming from "./img/instructor.png";
import calendar from "./img/calendar.png";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const instructors = [
  {
    id: 1,
    name: "Anmol Gupta",
    details: "Mechanical Engineer, IIT Delhi",
    logo1: iitd,
    logo2: google,
    image: programming,
  },
  {
    id: 2,
    name: "Rohan Yuttham",
    details: "Mechanical Engineer, IIT Delhi",
    logo1: iitd,
    logo2: google,
    image: programming,
  },
  {
    id: 3,
    name: "Abhishek Gupta",
    details:
      "IIT DElhi ( Computer Software ) Head of Robotics in IIT delhi Worked at Google",
    logo1: iitd,
    logo2: google,
    image: programming,
  },
  {
    id: 4,
    name: "V. Shreyas",
    details: "Electrical Engineer, IIT Delhi",
    logo1: iitd,
    logo2: google,
    image: programming,
  },
];

const InstructorCard = (props) => {
  return (
    <>
      <div className="instructor">
        <div className="instructor-pic">
          <img src={props.image} alt={props.name} />
        </div>
        <div className="instructor-info">
          <div className="instructor-name">{props.name}</div>
          <hr />
          <div className="instructor-details">{props.details}</div>
          <div className="logos row mx-0">
            <img src={props.logo1} alt={props.logo1} />
            <img src={props.logo2} alt={props.logo2} />
          </div>
        </div>
      </div>
    </>
  );
};

const CourseInstructors = () => {
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

  const CustomLeft = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-left"
      onClick={onClick}
    >
      <ArrowBackIcon className="course-carousel-icon" />
    </button>
  );

  const CustomRight = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-right"
      onClick={onClick}
    >
      <ArrowForwardIcon className="course-carousel-icon" />
    </button>
  );

  return (
    <>
      <div className="courses-instructors">
        <div className="courses-instructors-title">
          Brought to You by Best in The Country
        </div>
        {/* <div className="courses-instructors-subtitle">Meet our instructors</div> */}
        <div className="row mx-0">
          {instructors.map((i) => {
            return (
              <InstructorCard
                key={i.id}
                name={i.name}
                logo1={i.logo1}
                logo2={i.logo2}
                details={i.details}
                image={i.image}
              />
            );
          })}
        </div>
        <div className="mobile-instructors">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            infinite={true}
            // autoPlay={true}
            // autoPlaySpeed={2500}
            // centerMode={showCenteredMode}
            customLeftArrow={<CustomLeft />}
            customRightArrow={<CustomRight />}
            // keyBoardControl={true}
            className="courses-instructor-carousel"
          >
            {instructors.map((i) => {
              return (
                <InstructorCard
                  key={i.id}
                  name={i.name}
                  logo1={i.logo1}
                  logo2={i.logo2}
                  details={i.details}
                  image={i.image}
                />
              );
            })}
          </Carousel>
        </div>
        <div className="text-center">
          <button className="course-instructor-bookfreeclass-btn">
            <img src={calendar} alt="freeclass" />
            Book a free class now
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseInstructors;
