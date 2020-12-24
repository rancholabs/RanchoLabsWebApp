import React from "react";
import "../Courses/css/CoursesDetailedListCards.css";
// import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Fontawesome from "react-fontawesome";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import courseClass from "../../Asssets/courseClass.png";
import courseCardBottomRIght from "../../Asssets/courseCardBottomRIght.png";
import courseCardTicks from "../../Asssets/courseCardTicks.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "../../Asssets/Icon feather-arrow-left.png";
import { useHistory } from "react-router-dom";

import pacman from "./img/pacman.png";
import angrybird from "./img/angrybird.png";
import zombie from "./img/zombie.png";
import translator from "./img/translator.png";
import chatbot from "./img/chatbot.png";
import lostandfound from "./img/lostandfound.png";
import innovate1 from "./img/innovate1.png";
import innovate2 from "./img/innovate2.png";

import "./css/YoungInnovatorCards.css";

const CoursesDetailedListCardItem = ({ index, courseDetails }) => {
  const hHistory = useHistory();

  const {
    id: id,
    name,
    durationInHours: duration,
    outcomesByTopics,
    totalClasses,
  } = courseDetails;
  const updatedOutcomes = (outcomes) => {
    return outcomes.remainingCount > 0
      ? [...outcomes.topics, `+${outcomes.remainingCount}`]
      : [...outcomes.topics];
  };
  return (
    <div className="courses-detailed-list-card-item youngInnovatorCards__singleCard">
      <img
        src={courseCardBottomRIght}
        className="courseCardBottomRIght youngInnovatorCards__singleCard__bottomRightImg"
      ></img>
      <div className="top-boxes">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3">
          <div className="border-left"></div>
        </div>
        <div className="box4"></div>
        {/* {index > 0 && index < 3 && (
          <div className="marketing-box">
            {index === 1 && <>Most Popular</>}
            {index === 2 && <>Best Value</>}
          </div>
        )} */}
      </div>
      <div className="title">
        <h3>{name}</h3>
        <span>
          <img src={courseClass}></img>
          <p>{totalClasses + " Classes"}</p>
        </span>
      </div>
      {/* <div className="grade-duration">
        GRADE {gradeRange.minG} - {gradeRange.maxG}{" "}
        <span className="splitter">|</span> {duration} hrs Live
      </div> */}
      <div className="outcomes">
        {outcomesByTopics?.map((section) => {
          return (
            <div className="outcomes-section youngInnovatorCards__outcome">
              <div className="topic">{section.topic}</div>
              <div className="sub-topics sub-topics-build">
                {section.subtopics.map((subtop, si) => {
                  if (subtop.toString() !== "") {
                    return (
                      <>
                        <div key={si} className="sub-topics-build-section">
                          <img
                            src={
                              subtop === "Pacman"
                                ? pacman
                                : subtop === "Angry birds"
                                ? angrybird
                                : subtop === "Zoombies"
                                ? zombie
                                : subtop === "Text Translator"
                                ? translator
                                : subtop === "Chat Bot"
                                ? chatbot
                                : subtop === "Lost and found app"
                                ? lostandfound
                                : subtop === "Think of a real life problem"
                                ? innovate1
                                : subtop ===
                                  "Develop a solution with your team to solve the problem"
                                ? innovate2
                                : courseCardTicks
                            }
                            className={
                              section.topic === "LEARN"
                                ? "sub-topics-build-sectionIcon"
                                : "sub-topics-build-sectionIcon youngInnovatorCardsImg"
                            }
                          />
                          <p>{subtop}</p>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
        {/* <div className="outcomes-section">
          <div className="topic">BUILD</div>
          <div className="sub-topics sub-topics-build">
            {updatedOutcomes(builds).map((build, si, stArr) => {
              if (build && build !== "")
                return (
                  <div key={si} className="sub-topics-build-section">
                    <img
                      src={courseCardTicks}
                      className="sub-topics-build-sectionIcon"
                    />
                    <p>{build}</p>
                  </div>
                );
            })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

const YoungInnovatorCards = ({ coursesDetails }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
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
    <div className="youngInnovatorCards__container">
      <div className="youngInnovatorCards__header">
        <h3>Program Structure</h3>
        <hr />
      </div>
      <div className="courses-detailed-list-cards">
        {window.screen.width <= 600 ? (
          <Carousel
            swipeable
            draggable
            showDots={true}
            responsive={responsive}
            infinite={true}
            // autoPlay={true}
            // autoPlaySpeed={2500}
            customLeftArrow={<CustomLeft />}
            customRightArrow={<CustomRight />}
            // keyBoardControl={true}
            className="courses-courses-carousel"
          >
            {coursesDetails.map((courseDetails, ci) => {
              return (
                <CoursesDetailedListCardItem
                  key={courseDetails.id}
                  index={ci}
                  courseDetails={courseDetails}
                />
              );
            })}
          </Carousel>
        ) : (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            infinite={false}
            arrows={false}
            // autoPlay={true}
            // autoPlaySpeed={2500}
            // customLeftArrow={<CustomLeft />}
            // customRightArrow={<CustomRight />}
            // keyBoardControl={true}
            className="courses-courses-carousel"
          >
            {coursesDetails.map((courseDetails, ci) => {
              return (
                <CoursesDetailedListCardItem
                  key={courseDetails.id}
                  index={ci}
                  courseDetails={courseDetails}
                />
              );
            })}
          </Carousel>
        )}
      </div>
      <button
        className="youngInnovatorCards__enrollBtn"
        onClick={() => (window.location.href = "/enroll/younginnovator")}
      >
        Enroll Now
      </button>
    </div>
  );
};

export default YoungInnovatorCards;
