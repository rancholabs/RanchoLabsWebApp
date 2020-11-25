import React from "react";
import "./css/CoursesDetailedListCards.css";
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

const CoursesDetailedListCardItem = ({ index, courseDetails }) => {
  const {
    _id: id,
    name,
    gradeRange,
    durationInHours: duration,
    outcomesByTopics: { learns, builds, innovates },
    price,
    courseStructure,
    totalClasses,
    curriculumPDF,
  } = courseDetails;
  const curriculum = courseStructure ? courseStructure.filePath : "";
  const updatedOutcomes = (outcomes) => {
    return outcomes.remainingCount > 0
      ? [...outcomes.topics, `+${outcomes.remainingCount}`]
      : [...outcomes.topics];
  };
  console.log(courseDetails);
  return (
    <div className="courses-detailed-list-card-item">
      <img src={courseCardBottomRIght} className="courseCardBottomRIght"></img>
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
        <div className="outcomes-section">
          <div className="topic">LEARN</div>
          <div className="sub-topics">
            {updatedOutcomes(learns).map((learn, si, stArr) => {
              if (learn.toString() !== "") {
                return (
                  <>
                    <div key={si}>{learn}</div>
                    <p>
                      {si < stArr.length - 1 && stArr[si + 1]?.toString() !== ""
                        ? "|"
                        : ""}
                    </p>
                  </>
                );
              }
            })}
          </div>
        </div>
        <div className="outcomes-section">
          <div className="topic">BUILD</div>
          <div className="sub-topics sub-topics-build">
            {updatedOutcomes(builds).map((build, si, stArr) => {
              if (build !== "")
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
        </div>
        {innovates.topics[0] !== "" && (
          <div className="outcomes-section">
            <div className="topic">INNOVATE</div>
            <div className="sub-topics">
              {updatedOutcomes(innovates).map((innovate, si, stArr) => {
                if (innovate !== "")
                  return (
                    <div key={si}>
                      {innovate}
                      {si < stArr.length - 1 ? " |" : ""}
                    </div>
                  );
              })}
            </div>
          </div>
        )}
      </div>
      {/*(curriculum && index === 0) ? (
                <a href={curriculum} target="_blank" className={`syllabus-padding syllabus`}>
                    DETAILED CURRICULAM
                </a>
            )
            :
            (
                <div className={`syllabus-padding${index === 0 ? " syllabus" : ""}`}>
                    {(index === 0) && (
                        <>DETAILED CURRICULAM</>
                    )}
                </div>
            )*/}
      <a
        href={curriculumPDF}
        target="_blank"
        className={`syllabus-padding syllabus`}
      >
        DETAILED CURRICULUM
      </a>
      <div className="learn-price">
        {curriculum ? (
          index !== 0 ? (
            <a
              href={"/enroll/" + id}
              style={{ textDecoration: "none" }}
              target="_blank"
              className="learn-more-btn"
            >
              <div className="text">ENROLL NOW</div>
            </a>
          ) : (
            <Link
              href={"/enroll/" + id}
              className="learn-more-btn"
              style={{ textDecoration: "none" }}
            >
              <div className="text">ENROLL NOW</div>
            </Link>
          )
        ) : (
          <a
            href={"/enroll/" + id}
            style={{ textDecoration: "none" }}
            target="_blank"
            className="learn-more-btn"
          >
            <div className="text">ENROLL NOW</div>
          </a>
        )}
        {/*<Link to={`/course/${id}`} className="learn-more-btn" style={{textDecoration: "none"}}>
                    <div className="text">LEARN MORE</div>
                </Link>*/}
        <div className="price">
          <div className="text">₹{price.amountAfterDiscount}/-</div>
        </div>
      </div>
    </div>
  );
};

const CoursesDetailedListCards = ({ coursesDetails }) => {
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
    <>
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
                  key={courseDetails._id}
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
                  key={courseDetails._id}
                  index={ci}
                  courseDetails={courseDetails}
                />
              );
            })}
          </Carousel>
        )}
      </div>
      <div className="course-note">
        <span className="dollar">
          <Fontawesome name="dollar" />
        </span>
        &nbsp; 100% refund for unused classes, no questions asked.
      </div>
    </>
  );
};

export default CoursesDetailedListCards;
