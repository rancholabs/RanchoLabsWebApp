import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CouponIcon from "./images/abed265cd5f621820ce2457d1abc7391@2x.png";
import ClassesIcon from "./images/Icon material-class@2x.png";
import { updateFooter } from "../../Actions/Footer";
import { useDispatch, useSelector } from "react-redux";
import keys from "../../paykey";

import "./index.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function PaymentEnroll() {
  let { courseId } = useParams();
  const dispatch = useDispatch();

  const [enrolledCourse, setEnrolledCourse] = useState({});
  const [userCoupon, setuserCoupon] = useState("");
  const [validCouponDetails, setvalidCouponDetails] = useState({});
  const [couponValidStatus, setcouponValidStatus] = useState(false);
  const [couponDiscount, setcouponDiscount] = useState(0);
  const [finalAmount, setfinalAmount] = useState(0);
  const [batchMondays, setbatchMondays] = useState([]);
  const [batchDate, setbatchDate] = useState("");
  const [showCouponError, setshowCouponError] = useState(false);
  const [showSelectedDayError, setshowSelectedDayError] = useState(false);

  const [showYoungInnovator, setshowYoungInnovator] = useState(false);
  const [youngInnovatorAmount, setyoungInnovatorAmount] = useState(5499);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(updateFooter({ footerDisplay: "none" }));
  }, []);

  useEffect(() => {
    if (courseId === "younginnovator") {
      setshowYoungInnovator(true);
    } else {
      setshowYoungInnovator(false);
      axios
        .get(`/api/course/${courseId}`)
        .then((res) => setEnrolledCourse(res.data));
    }
  }, []);

  useEffect(() => {
    if (showYoungInnovator) {
      setfinalAmount(youngInnovatorAmount);
    } else {
      setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
    }
  }, [enrolledCourse, showYoungInnovator]);

  useEffect(() => {
    if (showYoungInnovator) {
      if (validCouponDetails.active) {
        if (youngInnovatorAmount > validCouponDetails.minAmount) {
          if (validCouponDetails.frequency - validCouponDetails.usedTimes > 0) {
            setcouponValidStatus(true);
            setcouponDiscount(validCouponDetails.amount);
            setfinalAmount(youngInnovatorAmount - validCouponDetails.amount);
          } else {
            setcouponValidStatus(false);
            setcouponDiscount(0);
            setfinalAmount(youngInnovatorAmount);
          }
        } else {
          setcouponValidStatus(false);
          setcouponDiscount(0);
          setfinalAmount(youngInnovatorAmount);
        }
      }
    } else {
      if (validCouponDetails.active && enrolledCourse.price) {
        if (
          enrolledCourse.price?.amountAfterDiscount >
          validCouponDetails.minAmount
        ) {
          if (validCouponDetails.frequency - validCouponDetails.usedTimes > 0) {
            setcouponValidStatus(true);
            setcouponDiscount(validCouponDetails.amount);
            setfinalAmount(
              enrolledCourse.price?.amountAfterDiscount -
                validCouponDetails.amount
            );
          } else {
            setcouponValidStatus(false);
            setcouponDiscount(0);
            setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
          }
        } else {
          setcouponValidStatus(false);
          setcouponDiscount(0);
          setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
        }
      }
    }
    //  else if(enrolledCourse.price) {
    //   setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
    // }
  }, [validCouponDetails, enrolledCourse, showYoungInnovator]);

  useEffect(() => {
    if (showYoungInnovator) {
      setbatchMondays([
        {
          date: new Date("01/02/2021").toString(),
          checked: false,
        },
        {
          date: new Date("01/15/2021").toString(),
          checked: false,
        },
        {
          date: new Date("03/21/2021").toString(),
          checked: false,
        },
        {
          date: new Date("03/21/2021").toString(),
          preebook: true,
          checked: false,
        },
      ]);
    } else {
      let today = new Date();
      let monday1 = new Date(
        today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))
      );
      let monday2 = new Date(monday1);
      monday2 = new Date(monday2.setDate(monday1.getDate() + 7));
      let monday3 = new Date(monday2);
      monday3 = new Date(monday3.setDate(monday2.getDate() + 7));
      let monday4 = new Date(monday3);
      monday4 = new Date(monday4.setDate(monday3.getDate() + 7));
      setbatchMondays([
        {
          date: monday1.toString(),
          checked: false,
        },
        {
          date: monday2.toString(),
          checked: false,
        },
        {
          date: monday3.toString(),
          checked: false,
        },
        {
          date: monday4.toString(),
          checked: false,
        },
      ]);
    }
  }, [showYoungInnovator]);

  const displayRazorpay = async () => {
    const _userInfo = localStorage.getItem("userInfo");
    const token = _userInfo ? JSON.parse(_userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const paymentBody = {
      price: {
        amount: finalAmount,
        currencyCode: "INR",
      },
      batchId: "",
      courseId: showYoungInnovator ? "" : enrolledCourse._id,
      userId: userInfo.userId,
      couponId: couponValidStatus ? validCouponDetails._id : null,
      selectedDate: batchMondays.filter((day) => day.checked === true)[0]?.date,
      showYoungInnovator: showYoungInnovator,
    };

    const data = await axios
      .post("/api/payment/order", paymentBody, config)
      .then((res) => {
        return res.data;
      });

    const options = {
      key: keys.RAZOR_PAY_KEY_ID, //test mode key
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Rancho Labs",
      description: "Thank you for choosing Rancho Labs.",
      image:
        "https://rancho-labs-app.s3.amazonaws.com/images/logo-1607930535803.png",
      handler: function (response) {
        alert("Thank you for choosing Rancho Labs!");
        window.location.href = "/dashboard";
      },
      prefill: {
        name:
          userInfo.userName.first +
          " " +
          (userInfo.userName.last ? userInfo.userName.last : ""),
        // email: "sdfdsjfh2@ndsfdf.com",
        // phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paynow = () => {
    if (!userInfo) {
      window.location.href = `/login?redirect=enroll&&course=${courseId}`;
    } else {
      // check for selected day
      let _singleMonday = batchMondays.filter((day) => day.checked === true);
      if (_singleMonday.length > 0) {
        // show razor pay screen
        displayRazorpay();
        setshowSelectedDayError(false);
      } else {
        // show selected day error
        setshowSelectedDayError(true);
      }
    }
  };

  const checkCoupon = () => {
    if (userCoupon !== "") {
      axios
        .get(`/api/coupon/code/${userCoupon}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.coupon.active) {
            setvalidCouponDetails(res.data.coupon);
          } else {
            setvalidCouponDetails({});
            setcouponValidStatus(false);
            setcouponDiscount(0);
            setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
          }
        })
        .catch((err) => {
          setvalidCouponDetails({});
          setcouponValidStatus(false);
          setcouponDiscount(0);
          setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
          console.log(err);
        });
    } else {
      setvalidCouponDetails({});
      setcouponValidStatus(false);
      setcouponDiscount(0);
      setfinalAmount(enrolledCourse.price?.amountAfterDiscount);
    }
    setshowCouponError(true);
  };

  const handleBatchDayChange = (e, index) => {
    let _batchMondays = [...batchMondays];
    _batchMondays.forEach((day, i) => {
      if (i === index) {
        day.checked = true;
      } else {
        day.checked = false;
      }
    });
    setbatchMondays(_batchMondays);
    let singleDay = _batchMondays.filter((day) => day.checked === true);
    singleDay = singleDay[0];
    if (showYoungInnovator) {
      if (singleDay.preebook) {
        setyoungInnovatorAmount(499);
        setcouponValidStatus(false);
        setcouponDiscount(0);
        // setvalidCouponDetails({})
        setfinalAmount(499);
      } else {
        setyoungInnovatorAmount(5499);
        if (validCouponDetails._id) {
          if (validCouponDetails.active) {
            if (5499 > validCouponDetails.minAmount) {
              if (
                validCouponDetails.frequency - validCouponDetails.usedTimes >
                0
              ) {
                setcouponValidStatus(true);
                setcouponDiscount(validCouponDetails.amount);
                setfinalAmount(5499 - validCouponDetails.amount);
              } else {
                setcouponValidStatus(false);
                setcouponDiscount(0);
                setfinalAmount(5499);
              }
            } else {
              setcouponValidStatus(false);
              setcouponDiscount(0);
              setfinalAmount(5499);
            }
          } else {
            setcouponValidStatus(false);
            setcouponDiscount(0);
            setfinalAmount(5499);
          }
        } else {
          setcouponValidStatus(false);
          setcouponDiscount(0);
          setfinalAmount(5499);
        }
      }
    }
  };

  return (
    <div className="payment">
      <div className="payment__details">
        <div className="payment__details__section">
          {showYoungInnovator ? (
            <h1>
              Young Innovators <br /> Program
            </h1>
          ) : (
            <h1>{enrolledCourse?.courseGroup?.name + " Curriculum"}</h1>
          )}
          {!showYoungInnovator && (
            <h1>
              {"For class " +
                enrolledCourse?.gradeRange?.minG +
                "-" +
                enrolledCourse?.gradeRange?.maxG}
            </h1>
          )}
          <hr />
        </div>
        <div className="payment__details__section">
          {!showYoungInnovator && (
            <h3>
              {enrolledCourse.courseGroup?.name + " : " + enrolledCourse.name}
            </h3>
          )}
          <div className="payment__details__courseData">
            <div className="payment__details__courseDataSection">
              <img src={ClassesIcon} />
              {showYoungInnovator ? (
                <label>{"24" + " Hours"}</label>
              ) : (
                <label>{enrolledCourse.totalClasses + " Classes"}</label>
              )}
            </div>
            <div className="payment__details__courseDataSection">
              {!showYoungInnovator && <label>1:3 Live Class</label>}
            </div>
          </div>
        </div>
        {window.innerWidth > 600 && (
          <div className="payment__details__section payment__details__batch">
            <h3>Select a Batch</h3>
            {batchMondays.map((day, index) => {
              let today = new Date(day.date);
              return (
                <div className="payment__details__courseDataSection">
                  <input
                    type="radio"
                    checked={day.checked}
                    name="batchdatestart"
                    onChange={(e) => handleBatchDayChange(e, index)}
                    id={"batch" + index}
                  />
                  <label for={"batch" + index}>
                    {(day.preebook ? "Prebooking " : "Starting from ") +
                      (today.getDate() < 10
                        ? "0" + today.getDate()
                        : today.getDate()) +
                      "/" +
                      (today.getMonth() + 1 < 10
                        ? "0" + (today.getMonth() + 1)
                        : today.getMonth() + 1) +
                      "/" +
                      today.getFullYear()}
                  </label>
                </div>
              );
            })}
            {showSelectedDayError && (
              <p className="coupon__invalid__text">Please select a date!</p>
            )}
          </div>
        )}
        <p className="payment__courseNote">
          Note: Time and date will be decided after enrollment in discussion
          with parent according to the availability of students
        </p>
      </div>
      <div className="payment__window">
        <div>
          <div className="payment__window__couponContent">
            <img src={CouponIcon} />
            <h3>Apply Coupon</h3>
          </div>
          <div className="payment__window__coupon">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={userCoupon}
              onChange={(e) => setuserCoupon(e.target.value)}
            />
            <button onClick={checkCoupon}>Apply</button>
          </div>
          {userCoupon !== "" && showCouponError ? (
            couponValidStatus ? (
              <p className="coupon__valid__text">Coupon Applied!</p>
            ) : (
              <p className="coupon__invalid__text">Invalid Coupon!</p>
            )
          ) : null}
        </div>
        {window.innerWidth < 600 && (
          <div className="payment__details__section payment__details__batch">
            <h3>Select a Batch</h3>
            {batchMondays.map((day, index) => {
              let today = new Date(day.date);
              return (
                <div className="payment__details__courseDataSection">
                  <input
                    type="radio"
                    checked={day.checked}
                    name="batchdatestart"
                    onChange={(e) => handleBatchDayChange(e, index)}
                    id={"batch" + index}
                  />
                  <label for={"batch" + index}>
                    {(day.preebook ? "Prebooking " : "Starting from ") +
                      (today.getDate() < 10
                        ? "0" + today.getDate()
                        : today.getDate()) +
                      "/" +
                      (today.getMonth() + 1 < 10
                        ? "0" + (today.getMonth() + 1)
                        : today.getMonth() + 1) +
                      "/" +
                      today.getFullYear()}
                  </label>
                </div>
              );
            })}
            {showSelectedDayError && (
              <p className="coupon__invalid__text">Please select a date!</p>
            )}
          </div>
        )}
        <div className="payment__window__feeDetails">
          <h3>Fee Details</h3>
          <div className="payment__window__feeData">
            <label>Course Fee</label>
            <label>
              Rs.{" "}
              {showYoungInnovator
                ? youngInnovatorAmount
                : enrolledCourse.price?.amountAfterDiscount}
              /-
            </label>
          </div>
          <div className="payment__window__feeData">
            <label>Coupon Discount</label>
            <label>Rs. -{couponValidStatus ? couponDiscount : 0}/-</label>
          </div>
        </div>
        <div>
          <hr />
          <div className="payment__window__total">
            <div className="payment__window__feeData">
              <label>Total Fee</label>
              <label>Rs. {finalAmount}/-</label>
            </div>
          </div>
          <button className="payment__window__btn" onClick={paynow}>
            Proceed Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentEnroll;
