import React from "react";
import "./css/DashboardTestimonial.css";
import student from "./img/student.jpg";
import { Carousel } from "react-responsive-carousel";
import Fontawesome from "react-fontawesome";

const testimonialList = [
  {
    desc: "",
    name: "",
  },
  {
    desc: "",
    name: "",
  },
  {
    desc: "",
    name: "",
  },
];

function Testimonial(props) {
  return (
    <>
      <div className="row mx-0">
        <div className="dashboard-testimonial-image">
          <img src={student} />
        </div>
        <div className="dashboard-testimonial-desc">
          <div className="row mx-0">
            <div class="quote1">"</div>
            <div className="dt-content">
              The Robotics course has been a great learning experience for my
              son. Hands on projects in simulated environments were provided and
              gave my son a solid foundation to 'future proof' his skill sets.
            </div>
            <div class="quote2">"</div>
          </div>
          <div className="testimonial-name">
            - Vandhana (mother of class 7 student)
          </div>
        </div>
      </div>
      <div className="testimonial-controls row mx-0"></div>
    </>
  );
}

const Testimonials = () => {
  return (
    <>
      <div className="dashboard-testimonials">
        <Carousel infiniteLoop useKeyboardArrows>
          {testimonialList.map(Testimonial)}
        </Carousel>
      </div>
    </>
  );
};

export default Testimonials;
