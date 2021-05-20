import React, { useEffect, useState } from "react";
import InstructorSchedule from "./InstructorSchedule";
import { useDispatch, useSelector } from "react-redux";

function Index() {
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo || userInfo.role !== "instructor") {
      window.location.href = "/";
      alert("Access Denied - Login using Instructor Credentials");
    } else {
      setShow(true);

      const _userInfo = localStorage.getItem("userInfo");
      const token = _userInfo ? JSON.parse(_userInfo).token : "";
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
    }
  }, []);
  return <>{show && <InstructorSchedule />}</>;
}

export default Index;
