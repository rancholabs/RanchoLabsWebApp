import React, { useState, useEffect } from "react";
import "./AdminCurriculum.css";
import AdminCourseCard from "./AdminCourseCard";
import AdminNewCurriculum from "./AdminNewCurriculum";
import AdminNewCourse from "./AdminNewCourse";

function AdminCurriculum({ courseGroups, updateCourseGroups }) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);
  const [currentCurriculum, setCurrentCurriculum] = useState(courseGroups[0]);
  const [tobeEditedCourse, setTobeEditedCourse] = useState({});
  const [tobeEditedCurriculum, setTobeEditedCurriculum] = useState({});

  useEffect(() => {
    if (currentCurriculum?._id) {
      closeAddNewForm();
    }
  }, [courseGroups, currentCurriculum]);

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
    setCurrentCurriculum({});
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

  const closeAddNewForm = () => {
    setShowNewCourseForm(false);
    setShowNewForm(false);
    setTobeEditedCourse({});
    const selectedCurriculum = courseGroups.filter(
      (cg) => cg._id === currentCurriculum._id
    );
    setCurrentCurriculum(selectedCurriculum[0]);
  };

  const editCurriculum = () => {
    setShowNewCourseForm(false);
    setShowNewForm(true);
    setTobeEditedCourse({});
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
            updateCourseGroups={updateCourseGroups}
            closeAddNewForm={closeAddNewForm}
          />
        ) : showNewForm ? (
          <AdminNewCurriculum currentCurriculum={currentCurriculum} />
        ) : (
          <div className="adminCurriculum__cardContainer">
            {currentCurriculum && (
              <button
                className="adminCurriculum__editBtn"
                onClick={editCurriculum}
              >
                Edit
              </button>
            )}
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
