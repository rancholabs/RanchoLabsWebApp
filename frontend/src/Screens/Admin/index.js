import React, { useState } from "react";
import AdminCurriculum from "./AdminCurriculum";
import "./Admin.css";

function Index() {
  const [currentSection, setCurrentSection] = useState("curriculum");
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
            <li>Curriculum</li>
            <li>Instructors</li>
            <li>Batches</li>
            <li>Students</li>
            <li>Payments</li>
          </ul>
        </div>
        <div className="admin__body">
          {currentSection === "curriculum" && <AdminCurriculum />}
        </div>
      </div>
    </>
  );
}

export default Index;
