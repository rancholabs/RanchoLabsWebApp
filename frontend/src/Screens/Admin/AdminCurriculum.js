import React, { useState, useEffect } from "react";
import "./AdminCurriculum.css";
import AdminCourseCard from "./AdminCourseCard";
import AdminNewCurriculum from "./AdminNewCurriculum";
import AdminNewCourse from "./AdminNewCourse";

function AdminCurriculum({ courseGroups }) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [currentCurriculum, setCurrentCurriculum] = useState(courseGroups[0]);
  const [tobeEditedCourse, setTobeEditedCourse] = useState({});

  const openNewCourseForm = () => {
    if (currentCurriculum) {
      setShowNewCourseForm(true);
      setShowNewForm(false);
    } else {
      alert("Select a curriculum first!");
    }
  };

  const openNewCurriculumForm = () => {
    setShowNewCourseForm(false);
    setShowNewForm(true);
  };

  const editCourse = (course) => {
    setShowNewCourseForm(true);
    setShowNewForm(false);
    setTobeEditedCourse(course);
  };

  const showAllCourses = (cg) => {
    setShowNewCourseForm(false);
    setShowNewForm(false);
    setTobeEditedCourse({});
    setCurrentCurriculum(cg);
  };

  return (
    <>
      <div className="adminCurriculum">
        <div className="adminCurriculum__topbar">
          {/* EXISTING COURSE GROUPS */}
          {courseGroups?.map((cg) => {
            return <h3 onClick={() => showAllCourses(cg)}>{cg.name}</h3>;
          })}
          {/* ADD NEW COURSE GROUP */}
          <h3 onClick={openNewCurriculumForm}>Add New</h3>
        </div>

        {showNewCourseForm ? (
          <AdminNewCourse
            currentCurriculum={currentCurriculum._id}
            tobeEditedCourse={tobeEditedCourse}
          />
        ) : showNewForm ? (
          <AdminNewCurriculum />
        ) : (
          <div className="adminCurriculum__cardContainer">
            {currentCurriculum?.courses?.map((cg) => {
              return <AdminCourseCard course={cg} editCourse={editCourse} />;
            })}
            <AdminCourseCard
              newCourse={true}
              openNewCourseForm={openNewCourseForm}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminCurriculum;
