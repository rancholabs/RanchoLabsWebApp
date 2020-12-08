import React, { useState, useEffect } from "react";
import "./css/Freeclass.css";
import { useDispatch, useSelector } from "react-redux";
import { UserForgotPassword } from "../../Actions/userAction";
import { updateStudent } from "../../Actions/Student";
import { updateHeader } from "../../Actions/Header";
import { updateFooter } from "../../Actions/Footer";
import { register, resetError } from "../../Actions/userAction";
import Fontawesome from "react-fontawesome";
import codes from "./codes";
import { useHistory } from "react-router-dom";
import EmailExistsAlertModal from "./EmailExistsAlertModal";
import queryString from "query-string";

function validateEmail(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (reg.test(email) == false) {
    return false;
  } else return true;
}

const FreeClass = ({ location }) => {
  const dispatch = useDispatch();
  const [pdialcode, setPdialcode] = useState("+91");
  const [name, setName] = useState("");
  const [pname, setPname] = useState("");
  const [email, setEmail] = useState("");
  const [pemail, setPemail] = useState("");
  const [contact, setContact] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState(null);
  const hHistory = useHistory();
  const [isEmailExists, setIsEmailExists] = useState(false);

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  const { isUpdated } = useSelector((state) => state.studentUpdate);

  const params = queryString.parse(location.search);

  console.log(params);

  useEffect(() => {
    if (error) {
      if (error && error.message === "Email already exists") {
        setIsEmailExists(true);
      }
    }
    return () => {
      if (error) dispatch(resetError());
    };
  }, [error]);

  const closeHandler = () => {
    setIsEmailExists(false);
  };

  useEffect(() => {
    if (isUpdated) {
      hHistory.push(`/setPassword/${email}`);
    }
  });

  const loginfor = params.loginfor ? params.loginfor : null;

  useEffect(() => {
    console.log(loginfor);

    if (userInfo) {
      // hHistory.push('/setPassword')
      const pfullname = pname.split(" ");

      const pfinalname = {
        first: pfullname[0],
        last: pfullname[1],
      };

      const parentDetails = {
        name: pfinalname,
        email: pemail,
        mobileNo: {
          code: pdialcode,
          number: contact,
        },
      };

      const freeEnrollment = {
        freeClass: {
          enrolled: loginfor === "freeclass" ? true : false,
          completed: false,
        },
        freeWorkshop: {
          enrolled: loginfor === "freeWorkshop" ? true : false,
          completed: false,
        },
      };

      console.log(parentDetails, grade, loginfor, freeEnrollment);

      if (params.school) {
        dispatch(
          updateStudent({
            parentDetails,
            grade,
            loginfor,
            freeEnrollment,
            school: params.school,
            batch: params.batch,
            course: params.course,
          })
        );
      } else {
        dispatch(
          updateStudent({ parentDetails, grade, loginfor, freeEnrollment })
        );
      }
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      email === "" ||
      name === "" ||
      pname === "" ||
      contact === "" ||
      pemail === "" ||
      pdialcode === ""
    ) {
      setMessage("Please fill all details");
    } else if (!validateEmail(email) || !validateEmail(pemail)) {
      setMessage("Please enter a valid email address");
    } else {
      const fullname = name.split(" ");

      const finalname = {
        first: fullname[0],
        last: fullname[1],
      };

      const mobileNo = "";

      dispatch(register(finalname, email));
      //   dispatch(register( finalname , email, parentdetails, grade, loginfor, mobileNo, freeclass ))
    }
  };

  useEffect(() => {
    dispatch(
      updateHeader({
        backgroundColor: "#171636",
        color: "#FFFFFF",
        iconColor: "#3CFAFF",
        iconDisplay: params?.loginfor === "workshop" ? "none" : "block",
        headerDisplay: "block",
      })
    );
    dispatch(updateFooter({ footerDisplay: "none" }));
  });

  return (
    <>
      {isEmailExists ? (
        <>
          <EmailExistsAlertModal closeHandler={closeHandler} />
        </>
      ) : (
        <>
          <div className="freeclass row mx-0">
            <div className="freeclass-content">
              <div className="freeclass-title">
                <div className="text-title">Join us and unleash</div>
                <div className="text-title">your dreams to code</div>
              </div>
              <div className="freeclass-desc">
                Sharing the same vision with you to take a step towards the
                future of automation, programming, coding and robotics.
              </div>
            </div>
            <div className="freeclass-signup-form">
              <form>
                <div className="freeclass-form-title">Sign up to explore!</div>
                <div className="hr"></div>
                <div className="p-name">
                  <div className="row mx-0">
                    <div className="input-icon">
                      <Fontawesome name="user" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Parents name"
                      value={pname}
                      onChange={(e) => setPname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-name">
                  <div className="row mx-0">
                    <div className="input-icon">
                      <Fontawesome name="envelope" />
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Parents e-mail address"
                      value={pemail}
                      onChange={(e) => setPemail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-name">
                  <div className="row mx-0">
                    <div className="input-icon">
                      <Fontawesome name="user" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Student name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-name">
                  <div className="row mx-0">
                    <div className="input-icon">
                      <Fontawesome name="envelope" />
                    </div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Student e-mail address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-split">
                  <input
                    list="pdialcodes"
                    name="country-code"
                    placeholder="+91"
                    value={pdialcode}
                    onChange={(e) => setPdialcode(e.target.value)}
                    style={{ paddingLeft: "1vw" }}
                  />
                  <datalist id="pdialcodes">
                    {codes.map((code) => (
                      <option value={code.dial_code}> {code.name}</option>
                    ))}
                  </datalist>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  // placeholder="select grade"
                >
                  <option>Select Grade</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                {message ? (
                  <p style={{ color: "#70707A", marginBottom: "0" }}>
                    {message}
                  </p>
                ) : (
                  setMessage
                )}
                <button onClick={submitHandler}>Sign Up</button>
                <p>
                  Already Have an accout?<a href="/login"> Login </a> here
                </p>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FreeClass;
