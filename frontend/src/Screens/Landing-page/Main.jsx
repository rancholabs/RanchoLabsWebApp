import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./css/index.css";
import "./css/Main.css";
import { updateHeader } from "../../Actions/Header";
import mobileimage from "./img/mainmobile.png";
import { useHistory } from "react-router-dom";
import { update, updateUserInfo } from "../../Actions/userAction";
import {
  getStudent,
  updateStudent,
  updateStudentFreeEnroll,
} from "../../Actions/Student";
import mainbg from "./img/main.png";
import mainbgmob from "./img/mainbgmob.png";

const mainContent = {
  MainHeading: "Live coding classes for grades 6th to 12th",
  Subheading:
    "Bringing 21st-century skills to help you become the next world tech leader",
};

function Content() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { student } = useSelector((state) => state.studentInfo);

  useEffect(() => {
    dispatch(
      updateHeader({
        backgroundColor: "#ffffff",
        color: "#FFFFFF",
        iconColor: "#3cfaff",
      })
    );
  }, []);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo && userInfo.role === "student") {
      dispatch(getStudent());
    }
  }, [userInfo]);

  function freeclasshandler() {
    if (userInfo) {
      if (userInfo.role === "student") {
        if (student && student.freeEnrollment.freeClass.completed) {
          alert("You have already completed free class");
        } else if (student && !student.freeEnrollment.freeClass.enrolled) {
          var updates = {
            freeEnrollment: {
              freeClass: {
                enrolled: true,
                completed: student.freeEnrollment.freeClass.completed,
              },
              freeWorkshop: {
                enrolled: student.freeEnrollment.freeWorkshop.enrolled,
                completed: student.freeEnrollment.freeWorkshop.completed,
              },
            },
          };
          dispatch(updateStudentFreeEnroll(updates));
        } else {
          alert("You have already enrolled for free class");
        }
        history.push("/dashboard");
      }
    } else {
      history.push("/freeclass?loginfor=freeclass");
    }
  }

  return (
    <div className="home main-content">
      <img className="main-bg" src={mainbg} alt="bg" />
      <img className="main-bg-mob" src={mainbgmob} alt="mbg" />
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <p className="title">{mainContent.MainHeading}</p>
            <p className="description">{mainContent.Subheading}</p>
          </div>
          <div className="col-md-7">
            {/* <div className="mobile-img"><img src={mobileimage} className="img-fluid" /></div> */}
          </div>
        </div>
        <div className="buttons row mx-0">
          <div className="sign-up">
            <a>
              <button onClick={freeclasshandler}>FREE CLASS</button>
            </a>
          </div>
          <div className="labtour">
            <a href="/aboutUs">
              <button>EXPLORE</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <>
      <Content />
    </>
  );
}

export default Main;
