import React from "react";
import "./AdminCurriculum.css";
import AdminCourseCard from "./AdminCourseCard";

function AdminCurriculum() {
  return (
    <>
      <div className="adminCurriculum">
        <div className="adminCurriculum__topbar">
          {/* EXISTING COURSE GROUPS */}
          <h3>Robotics</h3>
          <h3>Artificial Intelligence</h3>
          <h3>Programming</h3>
          {/* ADD NEW COURSE GROUP */}
          <h3>Add New</h3>
        </div>
        <div className="adminCurriculum__cardContainer">
          <AdminCourseCard />
          <AdminCourseCard />
          <AdminCourseCard />
          <AdminCourseCard />
          <AdminCourseCard />
          <AdminCourseCard />
          <AdminCourseCard newCourse={true} />
        </div>
      </div>
    </>
  );
}

export default AdminCurriculum;
