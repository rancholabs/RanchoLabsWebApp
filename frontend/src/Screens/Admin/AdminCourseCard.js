import React, { useState } from "react";
import "./AdminCourseCard.css";
import Labelicon from "../../Asssets/Icon material-class.png";
import EditIcon from "../../Asssets/Icon feather-edit.png";
import TickIcon from "../../Asssets/Group 30.png";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

function AdminCourseCard({ newCourse }) {
  const [courseChecked, setCourseChecked] = useState(false);

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

  return (
    <>
      {newCourse ? (
        <div className="adminCourseCard adminCourseCard__newCourseContainer">
          <div className="adminCourseCard__newCourse">
            <p>+</p>
            <h3>Add a new course</h3>
          </div>
        </div>
      ) : (
        <div className="adminCourseCard">
          <div className="adminCourseCard__header">
            <div className="adminCourseCard__headerRow">
              <h3>Robotics for beginners</h3>
              <img src={EditIcon}></img>
            </div>
            <div className="adminCourseCard__headerRow">
              <div className="adminCourseCard__headerRowContent">
                <img src={Labelicon}></img>
                <h3>12 classes</h3>
              </div>
              <PurpleSwitch
                checked={courseChecked}
                onChange={() => setCourseChecked(!courseChecked)}
                name="courseChecked"
              />
            </div>
          </div>
          <div className="adminCourseCard__body">
            <h3>LEARN</h3>
            <p>Electrical | Programming | Electrical</p>
            <h3>BUILD</h3>
            <span className="adminCourseCard__bodyChecks">
              <img src={TickIcon}></img>
              <p>Electrical </p>
            </span>
            <span className="adminCourseCard__bodyChecks">
              <img src={TickIcon}></img>
              <p>Electrical </p>
            </span>
            <span className="adminCourseCard__bodyChecks">
              <img src={TickIcon}></img>
              <p>Traffic light controller </p>
            </span>
            <h3 className="adminCourseCard__bodyInnovate">INNOVATE</h3>
            <p>Nothing</p>
            <div className="adminCourseCard__bodyPrice">
              <div>
                <h3>Original price</h3>
                <p>8999</p>
              </div>
              <div>
                <h3>New price</h3>
                <p>4999</p>
              </div>
            </div>
            <h3>Total Discount</h3>
            <p>50%</p>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminCourseCard;
