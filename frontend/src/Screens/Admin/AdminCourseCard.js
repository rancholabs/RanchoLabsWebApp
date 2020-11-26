import React, { useState } from "react";
import "./AdminCourseCard.css";
import Labelicon from "../../Asssets/Icon material-class.png";
import EditIcon from "../../Asssets/Icon feather-edit.png";
import TickIcon from "../../Asssets/Group 30.png";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

function AdminCourseCard({
  newCourse,
  openNewCourseForm,
  course,
  editCourse,
  updateCourseGroups,
}) {
  const PurpleSwitch = withStyles({
    switchBase: {
      color: "#4320BF",
      "&$checked": {
        color: "#4320BF",
      },
      "&$checked + $track": {
        backgroundColor: "#4320BF",
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const handleCourseEnableChange = (e) => {
    e.persist();
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    const body = {
      websiteEnabled: e.target.checked,
    };
    console.log(body);
    axios
      .put(`/api/course/${course._id}`, body, config)
      .then((res) => {
        if (body.websiteEnabled === true) alert("Course enabled!");
        else alert("Course disabled!");
        console.log(res.data);
        updateCourseGroups();
      })
      .catch((err) => {
        alert("Unable to update course");
        console.log(err);
      });
  };

  return (
    <>
      {newCourse ? (
        <div
          className="adminCourseCard adminCourseCard__newCourseContainer"
          onClick={openNewCourseForm}
        >
          <div className="adminCourseCard__newCourse">
            <p>+</p>
            <h3>Add a new course</h3>
          </div>
        </div>
      ) : (
        <div className="adminCourseCard">
          <div className="adminCourseCard__header">
            <div className="adminCourseCard__headerRow">
              <h3>{course.name}</h3>
              <img src={EditIcon} onClick={() => editCourse(course)}></img>
            </div>
            <div className="adminCourseCard__headerRow">
              <div className="adminCourseCard__headerRowContent">
                <img src={Labelicon}></img>
                <h3>{course.totalClasses + " classes"}</h3>
              </div>
              <PurpleSwitch
                checked={course.websiteEnabled}
                onChange={handleCourseEnableChange}
                name="courseChecked"
              />
            </div>
            <div className="adminCourseCard__headerRow">
              <h3>Classes</h3>
              <h3>
                {course.gradeRange.minG + " to " + course.gradeRange.maxG}
              </h3>
            </div>
          </div>
          <div className="adminCourseCard__body">
            <h3>LEARN</h3>
            {/* <div className="adminCourseCard__learnText"> */}
            <p>
              {course.outcomesByTopics.learns.topics.map((learn, index) => {
                return (
                  <>
                    {learn +
                      (index !==
                      course.outcomesByTopics.learns.topics.length - 1
                        ? " | "
                        : "")}{" "}
                  </>
                );
              })}
            </p>
            {/* </div> */}
            <h3>BUILD</h3>
            {course.outcomesByTopics.builds.topics.map((build) => {
              return (
                <span className="adminCourseCard__bodyChecks">
                  <img src={TickIcon}></img>
                  <p>{build} </p>
                </span>
              );
            })}
            <h3 className="adminCourseCard__bodyInnovate">INNOVATE</h3>
            {course.outcomesByTopics.innovates.topics.map((innovate) => {
              return <p>{innovate} </p>;
            })}
            <div className="adminCourseCard__bodyPrice">
              <div>
                <h3>Original price</h3>
                <p>{course.price.amount}</p>
              </div>
              <div>
                <h3>New price</h3>
                <p>{course.price.amountAfterDiscount}</p>
              </div>
            </div>
            <h3>Total Discount</h3>
            <p>
              {(
                ((course.price.amount - course.price.amountAfterDiscount) /
                  course.price.amount) *
                100
              ).toFixed(2) + "%"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminCourseCard;
