import React from "react";
import "./css/CoursesDetailedListCards.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Fontawesome from "react-fontawesome";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
      <div className="top-boxes">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3">
          <div className="border-left"></div>
        </div>
        <div className="box4"></div>
        {index > 0 && index < 3 && (
          <div className="marketing-box">
            {index === 1 && <>Most Popular</>}
            {index === 2 && <>Best Value</>}
          </div>
        )}
      </div>
      <div className="title">
        <h3>{name}</h3>
        <p>{totalClasses + " Classes"}</p>
      </div>
      {/* <div className="grade-duration">
        GRADE {gradeRange.minG} - {gradeRange.maxG}{" "}
        <span className="splitter">|</span> {duration} hrs Live
      </div> */}
      <div className="outcomes">
        <div className="outcomes-section">
          <div className="topic">LEARN</div>
          <div className="sub-topics">
            {updatedOutcomes(learns).map((learn, si, stArr) => (
              <>
                <div key={si}>{learn}</div>
                <p>{si < stArr.length - 1 ? "|" : ""}</p>
              </>
            ))}
          </div>
        </div>
        <div className="outcomes-section">
          <div className="topic">BUILD</div>
          <div className="sub-topics sub-topics-build">
            {updatedOutcomes(builds).map((build, si, stArr) => (
              <div key={si} className="sub-topics-build-section">
                <CheckCircleIcon className="sub-topics-build-sectionIcon" />
                <p>{build}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="outcomes-section">
          <div className="topic">INNOVATE</div>
          <div className="sub-topics">
            {updatedOutcomes(innovates).map((innovate, si, stArr) => (
              <div key={si}>
                {innovate}
                {si < stArr.length - 1 ? " |" : ""}
              </div>
            ))}
          </div>
        </div>
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
        href={curriculum}
        target="_blank"
        className={`syllabus-padding syllabus`}
      >
        DETAILED CURRICULAM
      </a>
      <div className="learn-price">
        {curriculum ? (
          index !== 0 ? (
            <a
              href={curriculum}
              style={{ textDecoration: "none" }}
              target="_blank"
              className="learn-more-btn"
            >
              <div className="text">ENROLL NOW</div>
            </a>
          ) : (
            <Link
              to={`/course/${id}`}
              className="learn-more-btn"
              style={{ textDecoration: "none" }}
            >
              <div className="text">ENROLL NOW</div>
            </Link>
          )
        ) : (
          <div className="learn-more-btn">
            <div className="text">ENROLL NOW</div>
          </div>
        )}
        {/*<Link to={`/course/${id}`} className="learn-more-btn" style={{textDecoration: "none"}}>
                    <div className="text">LEARN MORE</div>
                </Link>*/}
        <div className="price">
          <div className="text">
            {price.currency}
            {price.amount}/-
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesDetailedListCards = ({ coursesDetails }) => {
  console.log(coursesDetails);

  return (
    <>
      <div className="courses-detailed-list-cards">
        {window.screen.width <= 600 ? (
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
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
          coursesDetails.map((courseDetails, ci) => {
            return (
              <CoursesDetailedListCardItem
                key={courseDetails._id}
                index={ci}
                courseDetails={courseDetails}
              />
            );
          })
        )}
      </div>
      <div className="course-note">
        <span className="dollar">
          <Fontawesome name="dollar" />
        </span>
        &nbsp; 100% Refund for unused classes, if you are not satisfied, no
        lock-ins
      </div>
    </>
  );
};

export default CoursesDetailedListCards;
