import React, { useState, useEffect } from "react";
import AdminCurriculum from "./AdminCurriculum";
import axios from "axios";
import "./Admin.css";
import AdminBatch from "./AdminBatch";
import AdminInstructor from "./AdminInstructor";
import AdminDashboard from "./AdminDashboard";
import AdminMasterData from "./AdminMasterData";
import AdminSchool from "./AdminSchool";
import AdminCoupon from "./AdminCoupon";
import AdminCertificate from "./AdminCertificates";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.jpeg";

function Index() {
  const [currentSection, setCurrentSection] = useState("curriculum");
  const [courseGroups, setCourseGroups] = useState([]);
  const [allStudentData, setallStudentData] = useState([]);
  const [allAssignedBatchesData, setallAssignedBatchesData] = useState([]);
  const [allInstructors, setallInstructors] = useState([]);
  const [allSchools, setallSchools] = useState([]);
  const [allCoupons, setallCoupons] = useState([]);
  const [allPayments, setallPayments] = useState([]);
  const [allCertificates, setallCertificates] = useState([]);
  const [showContent, setshowContent] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      window.location.href = "/";
    } else {
      setshowContent(true);
      const _userInfo = localStorage.getItem("userInfo");
      const token = _userInfo ? JSON.parse(_userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      axios
        .get("/api/course/group/courseListAdmin", config)
        .then((res) => {
          setCourseGroups(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      axios
        .get("/api/course/enroll/all", config)
        .then((res) => {
          setallAssignedBatchesData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get("/api/instructor/admin", config)
        .then((res) => {
          setallInstructors(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get("/api/school", config)
        .then((res) => {
          setallSchools(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get("/api/coupon", config)
        .then((res) => {
          setallCoupons(res.data);
        })
        .catch((err) => console.log(err));

      axios
        .get("/api/allpayments", config)
        .then((res) => {
          setallPayments(res.data);
        })
        .catch((err) => console.log(err));

      axios.get("/api/certificate", config).then((res) => {
        console.log(res.data);
        setallCertificates(res.data);
      });
    }
  }, [userInfo]);

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
      .get("/api/course/group/courseListAdmin", config)
      .then((res) => {
        setCourseGroups(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {showContent && (
        <div className="admin">
          <div className="admin__sidebar">
            <img className="admin__sidebarLogo" src={logo} alt="logo"></img>
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
                onClick={() => setCurrentSection("school")}
                className={currentSection === "school" && "selected"}
              >
                Schools
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
              <li
                onClick={() => setCurrentSection("coupon")}
                className={currentSection === "coupon" && "selected"}
              >
                Coupon
              </li>
              <li
                onClick={() => setCurrentSection("certificate")}
                className={currentSection === "certificate" && "selected"}
              >
                Certificate
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
              <AdminBatch
                courseGroups={courseGroups}
                allStudentData={allStudentData}
                allInstructors={allInstructors}
                allSchoolsData={allSchools}
              />
            )}
            {currentSection === "instructor" && <AdminInstructor />}
            {currentSection === "dashboard" && (
              <AdminDashboard
                allStudentData={allStudentData}
                courseGroups={courseGroups}
                allAssignedBatchesData={allAssignedBatchesData}
                allInstructors={allInstructors}
                allPayments={allPayments}
                allCouponsData={allCoupons}
              />
            )}
            {currentSection === "master" && (
              <AdminMasterData allStudentData={allStudentData} />
            )}
            {currentSection === "school" && (
              <AdminSchool allSchoolsData={allSchools} />
            )}
            {currentSection === "coupon" && (
              <AdminCoupon allCouponsData={allCoupons} />
            )}
            {currentSection === "certificate" && (
              <AdminCertificate allCertificateData={allCertificates} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
