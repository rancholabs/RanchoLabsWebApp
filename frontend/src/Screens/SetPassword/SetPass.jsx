import React, { useEffect } from "react";
import "./css/SetPass.css";
import { useParams } from "react-router-dom";

import robot from "./img/robot.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserInfo } from "../../Actions/userAction";
import { setUserPassword, login } from "../../Actions/userAction";
// import robot2 from './img/robot2.png'

const SetPass = ({ location }) => {
  let { email } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );
  const { userInfo: loginUserInfo } = useSelector((state) => state.userLogin);
  const { isPasswordChanged } = useSelector((state) => state.userSetPassword);
  console.log(useSelector((state) => state.userSetPassword));
  const redirectPath = location.pathname;
  const { regUserInfo } = useSelector((state) => state.userRegister);

  console.log(email);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setUserPassword(password));
    // dispatch(updateUserInfo(userInfo))
  };

  useEffect(() => {
    if (!userInfo && !loginUserInfo) {
      const path = "/login";
      history.replace(`${path}?redirect=${redirectPath}`);
    }
  }, [userInfo, loginUserInfo]);

  useEffect(() => {
    if (isPasswordChanged) {
      console.log("sending to dashboard...");
      dispatch(login(email, password));
      var path = "/dashboard/?mode=signup";

      history.replace(path);
    }
  }, [isPasswordChanged]);

  return (
    <div>
      <div className="SetPass">
        <div className="row">
          <div
            className="col-xl-5"
            style={{ textAlign: "center", alignSelf: "flex-end" }}
          >
            <div className="heading">Almost done</div>
            <div className="content">Set password to explore more</div>
          </div>
          <div className="col-xl-7">
            <div className="card">
              <div className="try">TRY IT YOURSELF</div>
              <div className="signupforfree">Sign up for a free workshop</div>
              <div className="set">SET PASSWORD</div>
              <form>
                <div className="row" style={{ margin: "unset" }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="XXXXXXXXX"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

export default SetPass;
