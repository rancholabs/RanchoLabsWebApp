import React from "react";
import "./css/DashboardTestimonial.css";
import student from "./img/student.jpg";
// import { Carousel } from "react-responsive-carousel";
import Fontawesome from "react-fontawesome";
import Karandeep from "../Landing-page/img/karandeep.jpeg";
import aryan from "../Landing-page/img/aryan.jpeg";
import Siddharth from "../Landing-page/img/siddharth.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "../../Asssets/Icon feather-arrow-left.png";

const testimonialList = [
  {
    desc:
      "The Robotics course has been a great learning experience for my son. Hands on projects in simulated environments were provided and gave my son a solid foundation to 'future proof' his skill sets",
    name: "Vandhana (mother of class 7 student)",
    img: Siddharth,
  },
  {
    desc:
      "I found this very useful, educational and innovative program a lot because it brings the creativity out of the students. The wonderful guidance of the zealous instructors made my learning experience the best.",
    name: "Karandeep Singh (Class 11)",
    img: Karandeep,
  },
  {
    desc:
      "The fact that RanchoLabs are providing courses to students with no prior experience at such nominal fee amazes me. They pay close attention to each student with small batches.  I would highly recommend others to enroll with them.",
    name: "Aryan Verma (Class 12)",
    img: aryan,
  },
];

function Testimonial(props) {
  return (
    <>
      <div className="row mx-0">
        <div className="dashboard-testimonial-image">
          <img src={props.img} />
        </div>
        <div className="dashboard-testimonial-desc">
          <div className="row mx-0">
            <div class="quote1">"</div>
            <div className="dt-content">{props.desc}</div>
            <div class="quote2">"</div>
          </div>
          <div className="testimonial-name">- {props.name}</div>
        </div>
      </div>
      <div className="testimonial-controls row mx-0"></div>
    </>
  );
}

const Testimonials = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
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
      <div className="dashboard-testimonials">
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
          arrows={true}
          className="dashboard-testimonials-carousel"
        >
          {testimonialList.map(Testimonial)}
        </Carousel>
      </div>
    </>
  );
};

export default Testimonials;
