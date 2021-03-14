import React from "react";
import { useState } from "react";
import { Dropdown, Button, ButtonGroup, DropdownButton } from "react-bootstrap";
import "./css/DashboardBody.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { courseGroups } from "../../Actions/courseActions";
import { activeCourseGroup } from "../../Actions/dashboardActions";
import { getStudentCourses } from "../../Actions/Student";
import DashboardCards from "./DashboardCards";
import DashboardBanner from "./DashboardBanner";
import DashboardCertificate from "./DashboardCertificate";
import DashboardJourney from "./DashboardJourney";
import DashboardTestimonials from "./DashboardTestimonial";
import DashboardCongratsCard from "./DashboardCongratsCard";
import DashboardCertificateComplete from "./DashboardCertificateComplete";
import axios from "axios";
import { setDefaultFooter, updateFooter } from "../../Actions/Footer";
import { useHistory, useParams } from "react-router-dom";
import DashboardVideo from "./DashboardVideo";


const DashboardCourseChoice = (props) => {
const [choosen, setChoosen] = useState('')
  // const [course, setCourse] = useState(0);
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.courseGroups);
  const { loading, error, coursegroups } = groups;

  const { activeCourse } = useSelector((state) => state.activeCourse);
  const { student } = useSelector((state) => state.studentInfo);

  useEffect(() => {
    dispatch(courseGroups());
  }, []);

  useEffect(() => {
    if (student?.loginfor === "workshop") {
      let workshopID = coursegroups?.filter(
        (cg) => cg.name.toString().toLowerCase() === "workshop"
      )[0]?._id;
      dispatch(activeCourseGroup(workshopID));
    } else if (student?.loginfor === "freeclass") {
      let freeclassID = coursegroups?.filter(
        (cg) => cg.name.toString().toLowerCase() === "free class"
      )[0]?._id;
      dispatch(activeCourseGroup(freeclassID));
    }
  }, [coursegroups, student]);

  if (coursegroups) {
    var selected = coursegroups.filter((course) => {
      if (course._id === activeCourse) return course;
    });
  }

  const { userInfo } = useSelector((state) => state.userLogin);

  function handleClick(id) {
    dispatch(activeCourseGroup(id));
  }

  return (
    <>
      {coursegroups && (
        <div
          className="dchoice"
          style={{
            backgroundColor: "#F0F0F2",
            position: "relative",
            width: "35.27vw",
          }}
        >
          <Dropdown as={ButtonGroup} style={{ width: "100%" }}>
            <Button
              variant="success"
              style={{
                width: "max-content",
                marginRight: "unset",
                borderRadius: "inherit",
                background: "transparent",
                border: "none",
                paddingLeft: "0",
              }}
            >
              <div id="plus" className="align-self-center">
                <a href="/courses">+</a>
              </div>
            </Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
              style={{
                width: "100%",
                margin: "unset",
                background: "transparent",
                border: "none",
              }}
            >{
              () => setChoosen(selected[0]?.name)
              }
              {selected[0]?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {coursegroups.map((group) => {
                if (
                  student?.loginfor === "workshop" &&
                  group.name.toString().toLowerCase() !== "free class"
                ) {
                  return (
                    <>
                      <Dropdown.Item onClick={() => handleClick(group._id)}>
                        {group.name}
                      </Dropdown.Item>
                    </>
                  );
                } else if (
                  student?.loginfor === "freeclass" &&
                  group.name.toString().toLowerCase() !== "workshop"
                ) {
                  return (
                    <>
                      <Dropdown.Item onClick={() => handleClick(group._id)}>
                        {group.name}
                      </Dropdown.Item>
                    </>
                  );
                } else {
                  return null;
                }
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </>
  );
};

const DashboardHeaderLowerMob = (props) => {
  const history = useHistory();
  return (
    <div
      className="row dashboard-header-lower-mob mx-0"
      style={{ height: "9vw" }}
    >
      <div className="col-6 p-0">
        <DashboardCourseChoice courses={props.courses} />
      </div>
      <div className="col-3 pl-15">
        <div
          className="profile-title"
          onClick={() => history.push("/profile/student")}
        >
          PROFILE
        </div>
      </div>
      <div
        className="col-3"
        style={{ padding: 0, borderLeft: "1px solid rgba(240, 240, 242, 0.5)" }}
      >
        <div
          className="project-title"
          onClick={() =>
            history.push("/profile/student?scroll=student-profile-projects")
          }
        >
          PROJECT
        </div>
      </div>
    </div>
  );
};

const DashboardHeaderLower = (props) => {
  const history = useHistory();
  return (
    <div style={{ backgroundColor: "#020122", paddingTop: "2vw" }}>
      <div className="row dashboard-header-lower mr-0">
        <div className="col-4">
          <DashboardCourseChoice courses={props.courses} />
        </div>
        <div className="col-4">
          <div
            className="profile-title"
            onClick={() => history.push("/profile/student")}
          >
            PROFILE
          </div>
        </div>
        <div className="col-4" style={{ padding: 0 }}>
          <div
            className="project-title"
            onClick={() =>
              history.push("/profile/student?scroll=student-profile-projects")
            }
          >
            PROJECT
          </div>
        </div>
      </div>
    </div>
  );
};

function DashboardBody(props) {
  const dispatch = useDispatch();
  // const [choosen, setChoosen] = useState('robotics')
  // console.log(props)

  const { activeCourse } = useSelector((state) => state.activeCourse);
  const groups = useSelector((state) => state.courseGroups);
  const { loading, error, coursegroups } = groups;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [applyForCertificate, setapplyForCertificate] = useState(false);
  const [showLoadingCertificate, setshowLoadingCertificate] = useState(false);
  const [showEnabledCertificate, setshowEnabledCertificate] = useState(false);
  const [studentProfile, setstudentProfile] = useState({});
  const [activeWorkshop, setactiveWorkshop] = useState(false);
  const [activeFreeclass, setactiveFreeclass] = useState(false);
  const [workshopEnd, setworkshopEnd] = useState(false);
  const [minAttendance, setminAttendance] = useState(false);
  const [allCerts, setallCerts] = useState([]);
  const [certPaid, setcertPaid] = useState(false);
  const { courses } = useSelector((state) => state.studentCourses);

  useEffect(() => {
    dispatch(courseGroups());
  }, []);

  useEffect(() => {
    // check for payed courses
    dispatch(getStudentCourses());
  }, []);

  // useEffect(() => {
  //   if(courses){
  //     courses.filter()
  //   }
  // },[courses])

  // console.log(courses);

  useEffect(() => {
    if (coursegroups) {
      // console.log(coursegroups)
      let workshopGroup = coursegroups?.filter(
        (g) => g.name.toString().toLowerCase() === "workshop"
      );
      let freeclassGroup = coursegroups?.filter(
        (g) => g.name.toString().toLowerCase() === "free class"
      );
      if (workshopGroup.length > 0) {
        workshopGroup = workshopGroup[0];
        if (workshopGroup._id?.toString() === activeCourse?.toString()) {
          setactiveWorkshop(true);
          // console.log(workshopGroup)
          if(props){
            let __activeCourse = props.courses.filter((course) => {
              if (course.courseDetails.groupId === activeCourse){  
                // console.log(course)
                if(course.batch.batchType === 'workshop'){
                  // console.log(course)
                  if(course.batch.singleDate && course.batch.singleTime){
                    let dayOneEnd = new Date(course.batch.singleDate).setHours(
                      course.batch.singleTime.toString().split(":")[0],
                      course.batch.singleTime.toString().split(":")[1],
                      0,
                      0)

                      let courseTime = new Date(dayOneEnd).getHours() + 2;

                      let courseEndTime = new Date(dayOneEnd).setHours(courseTime)
                      // console.log(courseEndTime)
                      let x = new Date(courseEndTime).getTime();
                      // console.log(x)

                      let currentTime = new Date().getTime()
                      // console.log(currentTime)

                      // console.log(courseTime)
                      
                      // console.log(dayOneEnd)
                      if(currentTime >= courseEndTime){
                        setShowVideo(true)
                        setShowJourney(true)
                      }

                      
                      // if(course.batch.batchType === 'workshop'){
                      //   console.log(course)
                      //   if(course.batch.doubleDate && course.batch.doubleTime){
                      //     let dayOneEnd = new Date(course.batch.doubleDate).setHours(
                      //       course.batch.singleTime.toString().split(":")[0],
                      //       course.batch.singleTime.toString().split(":")[1],
                      //       0,
                      //       0)
                      //       const dayTwoEnd = new Date(dayOneEnd).getHours() + 1;

                      //       const dayTwoEndCurrent = new Date(dayOneEnd).setHours(dayTwoEnd)
                      //       console.log(new Date(dayTwoEndCurrent).getHours())
                      //       console.log(dayTwoEndCurrent)
                      //       console.log(dayTwoEnd)


                      //       const currentTime = new Date().getTime()
                      //       console.log(currentTime)


                      //       console.log(dayOneEnd)
                      //       if(currentTime >= dayTwoEndCurrent){
                      //         showCertific
                      //       }
                      //     }
                      //    }
                      //setShowVideo(true)
                  }
                }
                return course;    
              } 
              
            });
            // console.log(props)
          }
        } else {
          setactiveWorkshop(false);
        }
      } else if (freeclassGroup.length > 0) {
        freeclassGroup = freeclassGroup[0];
        if (freeclassGroup._id?.toString() === activeCourse?.toString()) {
          setactiveFreeclass(true);
        } else {
          setactiveFreeclass(false);
        }
      }
    }
  }, [activeCourse, coursegroups]);

  var _activeCourse = props.courses.filter((course) => {
    if (course.courseDetails.groupId === activeCourse) return course;
  });

  // var workshop = props.courses.filter((course) => {
  //   if (course.courseDetails.groupId === "") return course;
  // });

  var coursedata = _activeCourse.length ? _activeCourse[0] : null;

  useEffect(() => {
    if (coursedata && coursedata.batch) {
      if (coursedata.batch.batchType === "workshop") {
        var batchEndDate = new Date(coursedata.batch.doubleDate).setHours(
          coursedata.batch.doubleTime.toString().split(":")[0],
          coursedata.batch.doubleTime.toString().split(":")[1],
          0,
          0
        );
        if (batchEndDate <= new Date()) {
          setworkshopEnd(true);
          setapplyForCertificate(true);
          coursedata.batch.classes.forEach((sc) => {
            if (sc.attendance) {
              sc.attendance.forEach((att) => {
                if (att.userId === coursedata.userId && att.present === true) {
                  setminAttendance(true);
                }
              });
            }
          });
        }
      } else if (coursedata.batch.batchType === "freeclass") {
        var batchEndDate = new Date(coursedata.batch.singleDate).setHours(
          coursedata.batch.singleTime.toString().split(":")[0],
          coursedata.batch.singleTime.toString().split(":")[1],
          0,
          0
        );
        if (batchEndDate <= new Date()) {
          setworkshopEnd(true);
          coursedata.batch.classes.forEach((sc) => {
            if (sc.attendance) {
              sc.attendance.forEach((att) => {
                if (att.userId === coursedata.userId && att.present === true) {
                  setminAttendance(true);
                }
              });
            }
          });
          setapplyForCertificate(true);
        }
      }
    }
  }, [coursedata]);

  useEffect(() => {
    if (workshopEnd) {
      const _userInfo = localStorage.getItem("userInfo");
      const token = _userInfo ? JSON.parse(_userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      axios
        .get("/api/profile/student", config)
        .then((res) => {
          setstudentProfile(res.data);
          if (
            coursedata.batch.batchType === "workshop" ||
            coursedata.batch.batchType === "freeclass"
          ) {
            let courseCert = res.data.certificates?.filter(
              (cert) => cert.courseId === activeCourse
            );
            let iscourseCert = false;
            if (courseCert.length > 0) {
              courseCert = courseCert[0];
              iscourseCert = true;
            }

            if (iscourseCert) {
              setapplyForCertificate(false);
              if (courseCert.enabled === true) {
                setshowLoadingCertificate(false);
                setshowEnabledCertificate(true);
              } else {
                let timestamp = courseCert._id.toString().substring(0, 8);
                let certDate = new Date(parseInt(timestamp, 16) * 1000);

                let now = new Date();
                let createdAt = certDate;
                const oneDay = 60 * 60 * 1 * 1000;
                var compareDatesBoolean = now - createdAt > oneDay;
                if (compareDatesBoolean) {
                  setshowLoadingCertificate(false);
                  setshowEnabledCertificate(true);
                  // CHANGE ENABLED IN DB
                } else {
                  setshowLoadingCertificate(true);
                  setshowEnabledCertificate(false);
                }
              }
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [coursedata, workshopEnd]);

  useEffect(() => {
    if (activeWorkshop) {
      dispatch(updateFooter({ footerTopDisplay: "none" }));

      return () => {
        dispatch(setDefaultFooter());
      };
    }
  }, [activeWorkshop]);

  useEffect(() => {
    const _userInfo = localStorage.getItem("userInfo");
    const token = _userInfo ? JSON.parse(_userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    axios.get("/api/certificate", config).then((res) => {
      let userCert = res.data.filter(
        (cert) =>
          cert.userId === userInfo?.userId && cert.courseId === activeCourse
      );
      if (userCert.length > 0) {
        // user has paid for the certificate
        setcertPaid(true);
      }
      setallCerts(res.data);
    });
  }, [userInfo, activeCourse]);

  const showAppliedCertLoadingBanner = () => {
    // setapplyForCertificate(false);
    // setshowLoadingCertificate(true);
    window.location.reload();
  };

  const updateCertPaidStatus = (status) => {
    setcertPaid(status);
  };
  const [showVideo, setShowVideo] = useState(false)
  const [showJourney, setShowJourney] = useState(false)

  useEffect(() => {
    if(coursegroups){
      // console.log(coursegroups)


    }
  }, [coursegroups])

  return (
    <>
      {_activeCourse && (
        <>
          <DashboardHeaderLowerMob courses={props.courses} />
          <DashboardHeaderLower courses={props.courses} />

          <div style={{ backgroundColor: "#F0F0F2" }}>
            <DashboardBanner />
            <DashboardCards
              coursedata={coursedata}
              activeCourse={_activeCourse}
            />
            {
              (activeWorkshop && showVideo)  && <DashboardVideo courses = {props.courses}/>  
            }
            

            {(activeWorkshop || activeFreeclass) && (
              <>
                {applyForCertificate && (
                  <DashboardCertificate
                    minAttendance={minAttendance}
                    userInfo={userInfo?.userName}
                    activeCourse={activeCourse}
                    studentCerts={studentProfile?.certificates}
                    showAppliedCertLoadingBanner={showAppliedCertLoadingBanner}
                    freeClassCert={activeFreeclass}
                    allCerts={allCerts}
                    certPaid={certPaid}
                    updateCertPaidStatus={updateCertPaidStatus}
                    userId={userInfo?.userId}
                    from={
                      coursedata.batch.batchType === "workshop"
                        ? new Date(coursedata.batch.singleDate).getDate()
                        : ""
                    }
                    to={
                      coursedata.batch.batchType === "workshop"
                        ? new Date(coursedata.batch.doubleDate).getDate()
                        : ""
                    }
                    month={
                      coursedata.batch.batchType === "workshop"
                        ? new Date(coursedata.batch.singleDate).getMonth()
                        : ""
                    }
                    year={
                      coursedata.batch.batchType === "workshop"
                        ? new Date(coursedata.batch.singleDate).getFullYear()
                        : ""
                    }
                  />
                )}
                {showLoadingCertificate && <DashboardCongratsCard />}
                {showEnabledCertificate && (
                  <DashboardCertificateComplete
                    userInfo={userInfo?.userName}
                    activeCourse={activeCourse}
                    studentCerts={studentProfile?.certificates}
                  />
                )}
              </>
            )}
            {/* {(applyForCertificate ||
              showLoadingCertificate ||
              showEnabledCertificate ||
              activeWorkshop) && <DashboardJourney />} */}
              {
                (activeWorkshop && showVideo) && <DashboardJourney />
              }
            {/* {(applyForCertificate ||
              showLoadingCertificate ||
              showEnabledCertificate ||
              !activeWorkshop) && <DashboardTestimonials />} */}
              <DashboardTestimonials />
            {/* {(applyForCertificate ||
              showLoadingCertificate ||
              showEnabledCertificate ||
              !activeWorkshop) && <div className="workshop__emptyDiv"></div>} */}
              <div className = "workshop__emptyDiv"></div>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardBody;
