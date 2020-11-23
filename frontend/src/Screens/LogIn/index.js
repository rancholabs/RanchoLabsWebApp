import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle, loginFacebook } from "../../Actions/userAction";
import "./css/LogIn.css";
import google from "./img/google.png";
import facebook from "./img/facebook.png";
import Modal from "./../../Components/Modal";
import { GoogleSignIn } from "../../Components/SocialSignIn/Google";
import { FacebookSignIn } from "../../Components/SocialSignIn/Facebook";
import { Link, useHistory } from "react-router-dom";
import { setDefaultHeader, updateHeader } from "../../Actions/Header";
import { setIsIpadMiniMobileView } from "../../Actions/App";
import { updateFooter } from "../../Actions/Footer";
import Fontawesome from "react-fontawesome";

function validateEmail(email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) == false) {
    return false;
  } else return true;
}

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const signuplink = userInfo ? "/" : "/freeclass";

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === "" || email === "") {
      setMessage("Please fill all details");
    } else if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
    } else {
      dispatch(login(email, password));
    }
  };

  if (error) console.log("login error:", error);

  // const googleBtn = useRef()
  // const facebookBtn = useRef()

  useEffect(() => {
    dispatch(setDefaultHeader());
    dispatch(
      updateHeader({
        backgroundColor: "#171636",
        color: "#171636",
        iconColor: "#3CFAFF",
      })
    );
    dispatch(updateFooter({ footerDisplay: "none" }));
    dispatch(setIsIpadMiniMobileView(true));
    return () => {
      dispatch(setDefaultHeader());
      dispatch(setIsIpadMiniMobileView(false));
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);

      if (userInfo.role === "student") {
        history.push("/dashboard?mode=login");
      } else if (userInfo.role === "instructor") {
        history.push("/instructor/schedule");
      } else {
        history.push("/");
      }
    } else {
      // GoogleSignIn(googleBtn.current, loginGoogle, dispatch)
      // FacebookSignIn(facebookBtn.current, loginFacebook,  dispatch)
    }
  }, [userInfo]);

  // useEffect(() => {
  //     if(userInfo) {
  //         history.replace(redirectingPath)
  //     }
  // }, [userInfo])

  return (
    <div>
      <div className="LogIn">
        {!userInfo && (
          <>
            {/* <div className="row">
              <div
                className="col-xl-5"
                style={{ textAlign: "center", marginTop: "auto" }}
              >
                <div className="heading">Log in to your account</div>
                <div className="content">
                  Learn, build and Innovate with Rancho Labs
                </div>
              </div>
              <div className="col-xl-7">
                <div className="card">
                  <form onSubmit={submitHandler}>
                    <div className="row" style={{ margin: "unset" }}>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="row" style={{ margin: "unset" }}>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                    <div className="forgotpass">
                      <Link to="/forgotPassword">Forgot your password?</Link>
                    </div>
                    {message ? (
                      <p style={{ color: "#FFFFFF", marginBottom: "0" }}>
                        {message}
                      </p>
                    ) : (
                      setMessage
                    )}
                    {error && (
                      <p style={{ color: "#FFFFFF", marginBottom: "0" }}>
                        {error.auth === false
                          ? "Invalid Username/Password"
                          : error.user === false
                          ? "Seems like you have not registered account with us. Please signup to continue"
                          : error.message}
                      </p>
                    )}
                    <button type="submit" onClick={submitHandler}>
                      LOGIN
                    </button>
                    <div className="login">
                      New to Rancho Labs? <Link to={signuplink}>Sign Up</Link>{" "}
                      here
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
            <div className="freeclass row mx-0">
              <div className="freeclass-content">
                <div className="freeclass-title">
                  <div className="text-title">Log in to your account</div>
                </div>
                <div className="freeclass-desc">
                  Learn, build and Innovate with Rancho Labs
                </div>
              </div>
              <div className="freeclass-signup-form login-form">
                <form>
                  <div className="freeclass-form-title">Sign in!</div>
                  <div className="hr"></div>
                  <div className="p-name">
                    <div className="row mx-0">
                      {/* <div className="input-icon">
                        <Fontawesome name="envelope" />
                      </div> */}
                      <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="p-name">
                    <div className="row mx-0">
                      {/* <div className="input-icon">
                        <Fontawesome name="password" />
                      </div> */}
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="forgotpass">
                    <Link to="/forgotPassword">Forgot your password?</Link>
                  </div>
                  {message ? (
                    <p style={{ color: "#70707A", marginBottom: "0" }}>
                      {message}
                    </p>
                  ) : (
                    setMessage
                  )}
                  {error && (
                    <p style={{ color: "#FFFFFF", marginBottom: "0" }}>
                      {error.auth === false
                        ? "Invalid Username/Password"
                        : error.user === false
                        ? "Seems like you have not registered account with us. Please signup to continue"
                        : error.message}
                    </p>
                  )}
                  <button type="submit" onClick={submitHandler}>
                    LOGIN
                  </button>
                  <div className="login">
                    New to Rancho Labs? <Link to={signuplink}>Sign Up</Link>{" "}
                    here
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <div className="row llowerrow mr-0"></div> */}
    </div>
  );
};

export default LogIn;
