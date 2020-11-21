import React, { useEffect, useState } from "react";
import "./css/CoursesTestimonials.css";
import ai from "./img/ai.png";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "../../Asssets/Icon feather-arrow-left.png";
import purpleBlurBG from "../../Asssets/purpleBlurBG.svg";
import purpleBlurBGright from "../../Asssets/purpleBlurBGright.png";
import Karandeep from "../Landing-page/img/karandeep.jpeg";
import Siddharth from "../Landing-page/img/siddharth.jpg";
import varyam from "../Landing-page/img/varyam.PNG";
import kanav from "../Landing-page/img/kanav.jpeg";
import aryan from "../Landing-page/img/aryan.jpeg";

const testimonialsData = [
  {
    name: "Karandeep Singh",
    description:
      "I liked the program as it has been very useful,educative and innovative for me. It brings the creativity out of the students. All this has been possible due to the wonderful guidance of the zealous instructors. I am really very thankful to the entire team for providing me this wonderful opportunity of learning about Robotics.",
    class: "Class 11th",
    school: "Dayawati Modi Academy ,Uttar Pradesh",
    img: Karandeep,
  },
  {
    name: "Aryan Verma",
    description:
      "My experience with Rancho Labs has been great so far! The fact that they are providing courses to students with no prior experience at such nominal fee amazes me. They pay close attention to each student with small batches and don’t move a step forward until the doubts of every student has been cleared. I would highly recommend others to enroll with them as soon as possible!",
    class: "Class 12th",
    school: "School- GD Goenka, Vasant Kunj, New Delhi",
    img: aryan,
  },
  {
    name: "Varyam Gupta",
    description:
      "Although learning how to build robots, circuits and innovative projects seems like a hands-on activity, the amazing team at Rancho Labs has managed to achieve this feat on a virtual platform as well. Over the course of a month, I have gained a vast amount of knowledge in this field, and the projects that we have to make have really fascinated me. The best part of Rancho Labs is that they prepare you for the present as well as the future.",
    class: "Class 11th",
    school: "The Doon School, Dehradun",
    img: varyam,
  },
  {
    name: "Kanav Atre",
    description:
      "The course is seeming to interest me more than I thought it would and despite of the current covid19 situation, the team (Anshul sir, Aman sir & Rohan sir) is really able to explain the concepts and especially with help of the tincercad software, I am able to comprehend that how circuits work and I am also able to understand arduino programming and coding. Finally, I would say that I found the course very interesting and I would look forward to joining courses like these in future.",
    class: "Class 11th",
    school: "Delhi Public School Indirapuram, New Delhi",
    img: kanav,
  },
  {
    name: "Vandhana(Siddharth Mother)",
    description:
      "The Robotics course by Rancho Labs has been a great learning experience for Siddharth. The claases were well planned and executed and the instructors were available round the clock to clarify doubts.  Hands on projects in stimulated environments helped students to reinforce concepts learned every day. I am happy to have enrolled my son in this course,  as it has given a solid foundation to 'future proof' his skill sets.",
    class: "Class 7th student",
    school: "St Thomas Residential School - Kerala",
    img: Siddharth,
  },
];

const Testimonial = (testimony) => {
  return (
    <>
      <div className="courses-testimonial">
        <div className="testimonial-image">
          <img src={testimony.img} alt="img" className="img-fluid" />
          <div className="testimonial-image-dot testimonial-image-dot1"></div>
          <div className="testimonial-image-dot testimonial-image-dot2"></div>
          <div className="testimonial-image-dot testimonial-image-dot3"></div>
          <div className="testimonial-image-dot testimonial-image-dot4"></div>
        </div>
        <div className="testimonial-body">
          <div className="testimonial-desc row mx-0">
            <div className="quote col-1 p-0" style={{ marginTop: "10px" }}>
              "
            </div>
            <div className="desc-content col">{testimony.description}</div>
            <div className="quote col-1 p-0" style={{ alignSelf: "flex-end" }}>
              "
            </div>
          </div>
          <div className="testimonial-name">
            - {testimony.name}
            <br></br>
            {testimony.class}
            <br></br> {testimony.school}
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
      items: 2,
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
      <div className="courses-testimonials">
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-top-left"
        ></img>
        <img
          src={purpleBlurBG}
          className="course-purple-bg course-purple-bg-top-right"
        ></img>
        <div className="testimonials-title">What Parents and Students say</div>
        <div className="testimonials-subtitle">
          We have earned the trust of more than 8000 parents who believed in us
          for their children’s education.
        </div>

        <div className="testimonial-row">
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
            className="courses-testimonials-carousel"
          >
            {testimonialsData.map(Testimonial)}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CoursesTestimonials;
