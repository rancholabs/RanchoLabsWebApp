import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./DashboardHeader";
import DashboardBody from "./DashboardBody";
import { dashboard } from "../../Actions/dashboardActions";
import Modal from "../../Components/Modal";
import { useParams } from "react-router-dom";
import { updateHeader, setDefaultHeader } from "../../Actions/Header";
import { setIsIpadMiniMobileView } from "../../Actions/App";

const signinmessage = {
  blue: "Signed in Successfully!",
  white: "KEEP LEARNING\nBUILDING\nand\nINNOVATING",
  symbol: null,
  linkto: "/dashboard",
};

var loginmessage = {
  blue: "Logged in Successfully!",
  white: "KEEP LEARNING\nBUILDING\nand\nINNOVATING",
  symbol: null,
  linkto: "/dashboard",
};

function WorkshopDashboard({ history, location }) {
  const dispatch = useDispatch();

  const dashboardData = useSelector((state) => state.dashboard);
  const { loading, error, dashboard: data } = dashboardData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const mode =
    location && location.search ? location.search.split("mode=")[1] : null;

  useEffect(() => {
    dispatch(
      updateHeader({
        backgroundColor: "#020122",
        color: "#FFFFFF",
        iconColor: "#3CFAFF",
        iconDisplay: "block",
        headerDisplay: "block",
      })
    );
  });

  if (mode) {
    console.log(mode);
  }

  useEffect(() => {
    if (!userInfo || userInfo.role !== "student") history.push("/login");
    else dispatch(dashboard());
  }, [userInfo]);

  const [course, setCourse] = useState(0);

  function handleChange(courseVal) {
    setCourse(courseVal);
  }

  useEffect(() => {
    dispatch(setIsIpadMiniMobileView(true));
    // dispatch(setDefaultHeader())
  }, []);

  if (mode) {
    if (mode === "login") {
      var message = loginmessage;
    } else if (mode === "signup") {
      var message = signinmessage;
    }
  }

  return (
    <>
      {message && <Modal message={message}></Modal>}
      {data && (
        <>
          {Object.keys(data).length && (
            <>
              <DashboardHeader
                data={data}
                course={course}
                onChange={handleChange}
              />
              <DashboardBody courses={data.courses} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default WorkshopDashboard;
