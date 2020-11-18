import React from "react";
import "./css/index.css";
import "./css/CoursesProjects.css";
import glove from "./img/glove2.jpg";
import vca from "./img/vcak.jpg";
import ist from "./img/isto.jpg";
import lfr from "./img/lfr.jpeg";
import btb from "./img/siddharthproject.png";
import user from "./img/user2.png";
import aryan from "./img/aryan.jpeg";
import vibhav from "./img/vibhav.PNG";
import karandeep from "./img/karandeep.jpeg";
import Siddharth from "./img/siddharth.jpg";
import Shaik from "./img/shaikarif.jpeg";
import Fontawesome from "react-fontawesome";
import $ from "jquery";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const projects = [
  {
    title: "Smart Glove",
    subtitle: "Glove to convert gesture to text",
    studentname: "Vibhav Agrawal",
    studentimg: vibhav,
    category: "Innovation and Robotics",
    link: "",
    image: glove,
  },
  {
    title: "Voice controlled automation",
    subtitle:
      "Multipurpose voice control system to control home applicances & robots",
    studentname: "Karandeep Singh",
    studentimg: karandeep,
    category: "AI and Robotics",
    link: "",
    image: vca,
  },
  {
    title: "Intuitive Sanitizing Tunnel",
    subtitle:
      "A sanitization tunnel using UV Bath to kill the bacterias and viruses",
    studentname: "Aryan Verma",
    studentimg: aryan,
    category: "Robotics and Innovation",
    link: "",
    image: ist,
  },
  {
    title: "Bed-o-Boat",
    subtitle: "Smart bed which converts into a boat at time of flood",
    studentname: "Siddharth Kumar Gopal",
    studentimg: Siddharth,
    category: "Robotics and Innovation",
    link: "",
    image: btb,
  },
  {
    title: "Fire rescue robot",
    subtitle: "An automated robot to detect smoke and rescue",
    studentname: "Shaik Arif",
    studentimg: Shaik,
    category: "Robotics and Innovation",
    link: "",
    image: lfr,
  },
];

function ProjectCard(project) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={project.image} className="img-fluid"></img>
      </div>
      <div className="project-student">
        <img src={project.studentimg} className="img-fluid"></img>
      </div>
      <div className="card-body">
        <div className="project-cat">{project.category}</div>
        <div className="project-title">{project.title}</div>
        <div className="reveal">
          <div className="project-subtitle">{project.subtitle}</div>
          <div className="student-info" style={{ verticalAlign: "baseline" }}>
            {project.studentname}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentProjects() {
  function scrollL() {
    console.log($("#p-row").scrollLeft);
    $("#p-row").scrollLeft += 10;
    console.log(($("#p-row").scrollLeft += 10));
  }

  function scrollR() {
    var e = document.getElementById("p-row");
    // e.scrollBy(10,0)
  }
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
    <div className="courses-projects">
      <div className="projects-title">Check out our Students’ Projects</div>
      <div className="projects-description">
        Eager and enthusiastic students with a pinch of right guidance innovate
        great projects at Rancho Labs
      </div>
      {/* <div className="project-row" id="p-row">
                {
                    projects.map(ProjectCard)
                }
            </div>  */}
      <div className="testimonial-row">
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
          {projects.map(ProjectCard)}
        </Carousel>
        ;
      </div>
      {/* <div className="project-arrows row mx-0">
                <button onClick={scrollL}><Fontawesome name="angle-double-left" /></button>
                <button onClick={scrollR}><Fontawesome name="angle-double-right" /></button>
            </div> */}
    </div>
  );
}

export default StudentProjects;
