import React, { useEffect } from "react";
import "./css/ResetPass.css";

import robot from "./img/robot.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, setUserPassword } from "../../Actions/userAction";
import Modal from "./../../Components/Modal";
// import robot2 from './img/robot2.png'

const ResetPass = ({ location }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const [changeRequested, setChangeRequested] = useState(false);
  const { isPasswordChanged } = useSelector((state) => state.userSetPassword);
  console.log(useSelector((state) => state.userSetPassword));
  const { loading, error, userInfo } = userLogin;
  const [isPopupClosed, setIsPopupClosed] = useState(false);

  const message = {
    blue:
      "Your account password has been changed successfully. Please login again to continue.",
    white: "KEEP LEARNING\nBUILDING\nand\nINNOVATING",
    symbol: null,
    linkto: "/login",
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setChangeRequested(true);
    dispatch(setUserPassword(password, true));
    history.push("/login");
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     let path = `/login`;
  //     if (!isPasswordChanged) {
  //       path += `?redirect=${location?.pathname}`;
  //     }
  //     history.push(path);
  //   }
  // }, [userInfo, isPasswordChanged]);

  // useEffect(() => {
  //   if (isPasswordChanged && changeRequested) {
  //     dispatch(logout(false));
  //   }
  // }, [isPasswordChanged, changeRequested]);

  return (
    <div>
      {/*(isPasswordChanged && changeRequested) && (
                <Modal message = {message}></Modal>
            )*/}
      <div className="ResetPass">
        <div className="row">
          <div
            className="col-xl-5"
            style={{ textAlign: "center", alignSelf: "center" }}
          >
            <div className="heading">Great !</div>
            <div className="content">It's almost done</div>
          </div>
          <div className="col-xl-7">
            <div className="card">
              <div className="set">RESET PASSWORD</div>
              <form>
                <div className="row" style={{ margin: "unset" }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <input
                    type="password"
                    name="password"
                    placeholder="Confirm password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                </div>
                <button type="submit" onClick={submitHandler}>
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row slowerrow mr-0">
        <img src={robot} alt="robot"></img>
      </div>
    </div>
  );
};

export default ResetPass;
