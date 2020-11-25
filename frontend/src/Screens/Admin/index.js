import React, { useState, useEffect } from "react";
import AdminCurriculum from "./AdminCurriculum";
import axios from "axios";
import "./Admin.css";
import AdminBatch from "./AdminBatch";
import AdminInstructor from "./AdminInstructor";
import AdminDashboard from "./AdminDashboard";
import AdminMasterData from "./AdminMasterData";

function Index() {
  const [currentSection, setCurrentSection] = useState("curriculum");
  const [courseGroups, setCourseGroups] = useState([]);
  const [allStudentData, setallStudentData] = useState([]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/course/group/courseList", config)
      .then((res) => {
        console.log(res.data);
        setCourseGroups(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/student/all", config)
      .then((res) => {
        console.log(res.data);
        setallStudentData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateCourseGroups = () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios
      .get("/api/course/group/courseList", config)
      .then((res) => {
        console.log(res.data);
        setCourseGroups(res.data);
      })
      .catch((err) => console.log(err));
  };

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
            <li
              onClick={() => setCurrentSection("curriculum")}
              className={currentSection === "curriculum" && "selected"}
            >
              Curriculum
            </li>
            <li
              onClick={() => setCurrentSection("instructor")}
              className={currentSection === "instructor" && "selected"}
            >
              Instructors
            </li>
            <li
              onClick={() => setCurrentSection("batch")}
              className={currentSection === "batch" && "selected"}
            >
              Batches
            </li>
            <li
              onClick={() => setCurrentSection("curriculum")}
              // className={currentSection === "curriculum" && "selected"}
            >
              Students
            </li>
            <li
              onClick={() => setCurrentSection("dashboard")}
              className={currentSection === "dashboard" && "selected"}
            >
              Dashboard
            </li>
            <li
              onClick={() => setCurrentSection("master")}
              className={currentSection === "master" && "selected"}
            >
              Master Data
            </li>
          </ul>
        </div>
        <div className="admin__body">
          {currentSection === "curriculum" && (
            <AdminCurriculum
              courseGroups={courseGroups}
              updateCourseGroups={updateCourseGroups}
            />
          )}
          {currentSection === "batch" && (
            <AdminBatch courseGroups={courseGroups} />
          )}
          {currentSection === "instructor" && <AdminInstructor />}
          {currentSection === "dashboard" && (
            <AdminDashboard allStudentData={allStudentData} />
          )}
          {currentSection === "master" && (
            <AdminMasterData allStudentData={allStudentData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
