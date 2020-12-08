import React from "react";
// import "./css/CoursesInstructors.css";
import iitd from "../Courses/img/iitd.png";
import iitb from "../Courses/img/iitb.png";
// import DroneStark_white from "./img/DroneStark_white.png";
import google from "../Courses/img/google.png";
import RohanYutthamInstructor from "../Courses/img/RohanYutthamInstructor.png";
import Anshul from "../AboutUs/img/Anshul.png";
import Aman from "../AboutUs/img/Aman.jpg";
import NazneenKhanInstructor from "../Courses/img/NazneenKhanInstructor.png";
import KaashikaPhotoInstructor from "../Courses/img/KaashikaPhotoInstructor.png";
import calendar from "../Courses/img/calendar.png";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "../../Asssets/Icon feather-arrow-left.png";
import ReactHtmlParser from "react-html-parser";
import "./css/WorkshopTeam.css";

const instructors = [
  {
    id: 1,
    name: "Aman Kumar",
    details: `<p>Co-Founder - Rancho Labs
     <br/> Chemical Engineer, IIT Delhi </p>`,
    logo1: iitd,
    logo2: google,
    image: Aman,
    logoDesc: "IIT Delhi",
  },
  {
    id: 2,
    name: "Rohan Yuttham",
    details: `<p>Overall Coordinator  - Robotics Club, IIT Delhi <br/> Mechanical Engineer, IIT Delhi </p>`,
    logo1: iitd,
    logo2: google,
    image: RohanYutthamInstructor,
    logoDesc: "IIT Delhi",
  },
  {
    id: 3,
    name: "Anshul Agrawal",
    details:
      "<p>Co-Founder - Rancho Labs<br/> Mechanical Engineer, IIT Delhi </p>",
    logo1: iitd,
    logo2: google,
    image: Anshul,
    logoDesc: "IIT Delhi",
  },
  //   {
  //     id: 4,
  //     name: "Nazneen Khan",
  //     details:
  //       "<p>Robotics Software Engineer, Drone Stark. <br /> Drones and Computer Vision Expert. </p>",
  //     logo1: DroneStark_white,
  //     logo2: google,
  //     image: NazneenKhanInstructor,
  //     logoDesc: "Drone Stark",
  //   },
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
          <div className="instructor-details">
            {ReactHtmlParser(props.details)}
          </div>
          <div className="logos row mx-0">
            <span>
              <img src={props.logo1} alt={props.logo1} />
              <p>{props.logoDesc}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const Team = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  return (
    <>
      <div className="courses-instructors workshop-instructor">
        <div className="courses-instructors-title">Workshop Instructors</div>
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
                logoDesc={i.logoDesc}
                image={i.image}
              />
            );
          })}
        </div>
        <div className="mobile-instructors">
          <Carousel
            swipeable={true}
            draggable={true}
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
                  logoDesc={i.logoDesc}
                  image={i.image}
                />
              );
            })}
          </Carousel>
        </div>
        {/* <div className="text-center">
          <button
            className="course-instructor-bookfreeclass-btn"
            onClick={() =>
              (window.location.href = "/freeclass?loginfor=freeclass")
            }
          >
            <img src={calendar} alt="freeclass" />
            Book a free class now
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Team;
