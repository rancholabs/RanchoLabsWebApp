import React, { useState } from "react";
import "./css/StudentProfileEditIcon.css";

const StudentProfileEditIcon = ({ onClickHandler }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div
      className="student-profile-edit-icon"
      onClick={(e) => {
        if (window.screen.width >= 600) {
          onClickHandler();
        } else {
          setIsPopupOpen(true);
          setTimeout(() => {
            setIsPopupOpen(false);
          }, 5000);
        }
        e.stopPropagation();
      }}
    >
      ...
      <div className="edit">
        <div></div>
      </div>
      {isPopupOpen && (
        <span className="popuptext">
          Please open the site in Desktop, Laptop or Tablet to edit your
          profile!
        </span>
      )}
    </div>
  );
};

export default StudentProfileEditIcon;
