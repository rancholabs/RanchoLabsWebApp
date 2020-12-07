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
  const { activeCourse } = useSelector((state) => state.activeCourse);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [showWorkshopCert, setshowWorkshopCert] = useState(false);

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

  // useEffect(() => {
  //   if (coursedata) {
  //     if (coursedata.batch.batchType === "workshop") {
  //       var batchEndDate = new Date(coursedata.batch.doubleDate).setHours(
  //         coursedata.batch.doubleTime.toString().split(":")[0],
  //         coursedata.batch.doubleTime.toString().split(":")[1],
  //         0,
  //         0
  //       );
  //       if (batchEndDate <= new Date()) {
  //         coursedata.batch.classes.forEach((sc) => {
  //           if (sc.attendance) {
  //             sc.attendance.forEach((att) => {
  //               if (att.userId === coursedata.userId && att.present === true) {
  //                 setshowWorkshopCert(true);
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //   }
  // }, [coursedata]);

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
              {/* {showWorkshopCert && <DashboardCertificate />}
              <DashboardCertificateComplete />
              <DashboardCongratsCard /> */}
              <DashboardJourney />
              <DashboardTestimonials />
            </div>
          }
        </>
      )}
    </>
  );
}

export default DashboardBody;
