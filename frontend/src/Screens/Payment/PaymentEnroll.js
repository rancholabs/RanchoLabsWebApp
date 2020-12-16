import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CouponIcon from "./images/abed265cd5f621820ce2457d1abc7391@2x.png";
import ClassesIcon from "./images/Icon material-class@2x.png";
import { updateFooter } from "../../Actions/Footer";
import { useDispatch, useSelector } from "react-redux";

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
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(updateFooter({ footerDisplay: "none" }));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/course/${courseId}`)
      .then((res) => setEnrolledCourse(res.data));
  }, []);

  useEffect(() => {
    if (validCouponDetails.active && enrolledCourse.price) {
      if (
        enrolledCourse.price?.amountAfterDiscount > validCouponDetails.minAmount
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
  }, [validCouponDetails, enrolledCourse]);

  console.log(enrolledCourse);

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
      batchId: "5fca363ec6e81f2560dafb58",
      courseId: enrolledCourse._id,
      userId: userInfo.userId,
      couponId: couponValidStatus ? validCouponDetails._id : null,
    };

    const data = await axios
      .post("/api/payment/order", paymentBody, config)
      .then((res) => {
        return res.data;
      });

    console.log(data);

    const options = {
      key: "", //test mode key
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Rancho Labs",
      description: "Thank you for choosing Rancho Labs.",
      image:
        "https://rancho-labs-app.s3.amazonaws.com/images/logo-1607930535803.png",
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
      alert("Kindly login/register to purchase a course.");
    } else {
      // show razor pay screen
      displayRazorpay();
    }
  };

  const checkCoupon = () => {
    axios
      .get(`/api/coupon/code/${userCoupon}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.coupon.active) {
          setvalidCouponDetails(res.data.coupon);
        } else {
          alert("Invalid Coupon!");
        }
      })
      .catch((err) => {
        alert("Invalid Coupon!");
        console.log(err);
      });
  };

  return (
    <div className="payment">
      {enrolledCourse._id && (
        <>
          <div className="payment__details">
            <div className="payment__details__section">
              <h1>{enrolledCourse.courseGroup?.name + " Curriculum"}</h1>
              <h1>
                {"For class " +
                  enrolledCourse.gradeRange?.minG +
                  "-" +
                  enrolledCourse.gradeRange?.maxG}
              </h1>
              <hr />
            </div>
            <div className="payment__details__section">
              <h3>
                {enrolledCourse.courseGroup?.name + " : " + enrolledCourse.name}
              </h3>
              <div className="payment__details__courseData">
                <div className="payment__details__courseDataSection">
                  <img src={ClassesIcon} />
                  <label>{enrolledCourse.totalClasses + " Classes"}</label>
                </div>
                <div className="payment__details__courseDataSection">
                  <label>1:3 Live Class</label>
                </div>
              </div>
            </div>
            <div className="payment__details__section payment__details__batch">
              <h3>Select Batch Starting Date</h3>
              <div className="payment__details__courseDataSection">
                <input type="radio" />
                <label>From - To</label>
              </div>
              <div className="payment__details__courseDataSection">
                <input type="radio" />
                <label>From - To</label>
              </div>
              <div className="payment__details__courseDataSection">
                <input type="radio" />
                <label>From - To</label>
              </div>
            </div>
            <p className="payment__courseNote">
              Note: Time and data will be decided after enrollment in discussion
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
            </div>
            <div className="payment__window__feeDetails">
              <h3>Fee Details</h3>
              <div className="payment__window__feeData">
                <label>Course Fee</label>
                <label>Rs. {enrolledCourse.price?.amountAfterDiscount}/-</label>
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
              <button
                className="payment__window__btn"
                // onClick={paynow}
              >
                Proceed Payment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentEnroll;
