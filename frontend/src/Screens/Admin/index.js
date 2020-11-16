import React, { useState, useEffect } from "react";
import AdminCurriculum from "./AdminCurriculum";
import axios from "axios";
import "./Admin.css";
import AdminBatch from "./AdminBatch";
import AdminInstructor from "./AdminInstructor";

function Index() {
  const [currentSection, setCurrentSection] = useState("curriculum");
  const [courseGroups, setCourseGroups] = useState([]);

  useEffect(() => {
    axios
      .get("/api/course/group/courseList")
      .then((res) => {
        console.log(res.data);
        setCourseGroups(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="admin">
        <div className="admin__sidebar">
          <img
            className="admin__sidebarLogo"
            src="https://picsum.photos/250/250"
            alt="logo"
          ></img>
          <ul className="admin__sidebarList">
            <li onClick={() => setCurrentSection("curriculum")}>Curriculum</li>
            <li onClick={() => setCurrentSection("instructor")}>Instructors</li>
            <li onClick={() => setCurrentSection("batch")}>Batches</li>
            <li onClick={() => setCurrentSection("curriculum")}>Students</li>
            <li onClick={() => setCurrentSection("curriculum")}>Payments</li>
          </ul>
        </div>
        <div className="admin__body">
          {currentSection === "curriculum" && (
            <AdminCurriculum courseGroups={courseGroups} />
          )}
          {currentSection === "batch" && (
            <AdminBatch courseGroups={courseGroups} />
          )}
          {currentSection === "instructor" && <AdminInstructor />}
        </div>
      </div>
    </>
  );
}

export default Index;
