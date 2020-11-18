import React, { useEffect, useState } from "react";
import "./css/CoursesTestimonials.css";
import ai from "./img/ai.png";
import { Carousel } from "react-responsive-carousel";

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
  return (
    <>
      <div className="courses-testimonials">
        <div className="testimonials-title">What Parents and Students say</div>
        <div className="testimonials-subtitle">
          We have earned the trust of more than 8000 parents who believed in us
          for their children’s education.
        </div>

        <div className="testimonial-row">
          <Carousel infiniteLoop useKeyboardArrows>
            <div>
              {window.innerWidth > 600 && <Testimonial />}
              <Testimonial />
            </div>
            <div>
              {window.innerWidth > 600 && <Testimonial />}
              <Testimonial />
            </div>
            <div>
              {window.innerWidth > 600 && <Testimonial />}
              <Testimonial />
            </div>
            <div>
              {window.innerWidth > 600 && <Testimonial />}
              <Testimonial />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CoursesTestimonials;
