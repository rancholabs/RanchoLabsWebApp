import React, { useEffect, useState } from "react";
import "./css/CoursesTestimonials.css";
import ai from "./img/ai.png";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Testimonial = () => {
  return (
    <>
      <div className="courses-testimonial">
        <div className="testimonial-image">
          <img src={ai} alt="img" className="img-fluid" />
        </div>
        <div className="testimonial-body">
          <div className="testimonial-desc row mx-0">
            <div className="quote col-1 p-0" style={{ marginTop: "10px" }}>
              "
            </div>
            <div className="desc-content col">
              The Robotics course has been a great learning experience for my
              son. Hands on projects in simulated environments were provided and
              gave my son a solid foundation to 'future proof' his skill sets.
            </div>
            <div className="quote col-1 p-0" style={{ alignSelf: "flex-end" }}>
              "
            </div>
          </div>
          <div className="testimonial-name">
            - Vandhana (mother of class 7 student)
          </div>
        </div>
      </div>
    </>
  );
};

const CoursesTestimonials = () => {
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
      <div className="courses-testimonials">
        <div className="testimonials-title">What Parents and Students say</div>
        <div className="testimonials-subtitle">
          We have earned the trust of more than 8000 parents who believed in us
          for their children’s education.
        </div>

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
            className="courses-testimonials-carousel"
          >
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CoursesTestimonials;
