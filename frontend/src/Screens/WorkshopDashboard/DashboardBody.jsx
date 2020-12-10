import React from "react";
import { useState } from "react";
import { Dropdown, Button, ButtonGroup, DropdownButton } from "react-bootstrap";
import "./css/DashboardBody.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { courseGroups } from "../../Actions/courseActions";
import { activeCourseGroup } from "../../Actions/dashboardActions";
import DashboardCards from "./DashboardCards";
import DashboardBanner from "./DashboardBanner";
import DashboardCertificate from "./DashboardCertificate";
import DashboardJourney from "./DashboardJourney";
import DashboardTestimonials from "./DashboardTestimonial";
import DashboardCongratsCard from "./DashboardCongratsCard";
import DashboardCertificateComplete from "./DashboardCertificateComplete";
import axios from "axios";
import { setDefaultFooter, updateFooter } from "../../Actions/Footer";

const DashboardCourseChoice = (props) => {
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
    console.log(coursegroups);
    console.log(student);
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

  console.log(coursegroups);

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
            >
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
  return (
    <div
      className="row dashboard-header-lower-mob mx-0"
      style={{ height: "9vw" }}
    >
      <div className="col-7 p-0">
        <DashboardCourseChoice courses={props.courses} />
      </div>
      <div className="col-5 pl-15">
        <div className="profile-title">PROFILE</div>
      </div>
    </div>
  );
};

const DashboardHeaderLower = (props) => {
  return (
    <div style={{ backgroundColor: "#020122", paddingTop: "2vw" }}>
      <div className="row dashboard-header-lower mr-0">
        <div className="col-lg-5">
          <DashboardCourseChoice courses={props.courses} />
        </div>
        <div className="col-lg-7" style={{ alignSelf: "flex-end" }}>
          <div className="profile-title">PROFILE</div>
        </div>
      </div>
    </div>
  );
};

function DashboardBody(props) {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(courseGroups());
  }, []);

  useEffect(() => {
    if (coursegroups) {
      let workshopGroup = coursegroups?.filter(
        (g) => g.name.toString().toLowerCase() === "workshop"
      );
      if (workshopGroup.length > 0) {
        workshopGroup = workshopGroup[0];
        if (workshopGroup._id === activeCourse) {
          setactiveWorkshop(true);
        } else {
          setactiveWorkshop(false);
        }
      }
    }
  }, [activeCourse]);

  console.log(userInfo);

  var _activeCourse = props.courses.filter((course) => {
    if (course.courseDetails.groupId === activeCourse) return course;
  });

  var workshop = props.courses.filter((course) => {
    if (course.courseDetails.groupId === "") return course;
  });

  console.log(props.courses);
  console.log(_activeCourse);

  var coursedata = _activeCourse.length ? _activeCourse[0] : null;
  // console.log(activeCourse.courseDetails.groupId)
  console.log(coursedata);

  useEffect(() => {
    if (coursedata) {
      if (coursedata.batch.batchType === "workshop") {
        var batchEndDate = new Date(coursedata.batch.doubleDate).setHours(
          coursedata.batch.doubleTime.toString().split(":")[0],
          coursedata.batch.doubleTime.toString().split(":")[1],
          0,
          0
        );
        if (batchEndDate <= new Date()) {
          coursedata.batch.classes.forEach((sc) => {
            if (sc.attendance) {
              sc.attendance.forEach((att) => {
                if (att.userId === coursedata.userId && att.present === true) {
                  setapplyForCertificate(true);
                }
              });
            }
          });
        }
      }
    }
  }, [coursedata]);

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
      .get("/api/profile/student", config)
      .then((res) => {
        console.log(res.data);
        setstudentProfile(res.data);
        if (coursedata.batch.batchType === "workshop") {
          if (res.data.certificates.length > 0) {
            setapplyForCertificate(false);
            if (res.data.certificates[0].enabled === true) {
              setshowLoadingCertificate(false);
              setshowEnabledCertificate(true);
            } else {
              let timestamp = res.data.certificates[0]._id
                .toString()
                .substring(0, 8);
              let certDate = new Date(parseInt(timestamp, 16) * 1000);
              console.log(certDate);

              let now = new Date();
              let createdAt = certDate;
              const oneDay = 60 * 60 * 24 * 1000;
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
  }, [coursedata]);

  useEffect(() => {
    if (activeWorkshop) {
      dispatch(updateFooter({ footerTopDisplay: "none" }));

      return () => {
        dispatch(setDefaultFooter());
      };
    }
  }, [activeWorkshop]);

  return (
    <>
      {_activeCourse && (
        <>
          <DashboardHeaderLowerMob courses={props.courses} />
          <DashboardHeaderLower courses={props.courses} />
          {
            <div style={{ backgroundColor: "#F0F0F2" }}>
              <DashboardBanner />
              <DashboardCards
                coursedata={coursedata}
                activeCourse={_activeCourse}
              />
              {applyForCertificate && (
                <DashboardCertificate userInfo={userInfo.username} />
              )}
              {showLoadingCertificate && <DashboardCongratsCard />}
              {showEnabledCertificate && <DashboardCertificateComplete />}
              {!activeWorkshop && <DashboardJourney />}
              {!activeWorkshop && <DashboardTestimonials />}
              {activeWorkshop && <div className="workshop__emptyDiv"></div>}
            </div>
          }
        </>
      )}
    </>
  );
}

export default DashboardBody;
