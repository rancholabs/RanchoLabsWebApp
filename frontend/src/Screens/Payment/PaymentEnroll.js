import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CouponIcon from "./images/abed265cd5f621820ce2457d1abc7391@2x.png";
import ClassesIcon from "./images/Icon material-class@2x.png";
import { updateFooter } from "../../Actions/Footer";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";

function PaymentEnroll() {
  let { courseId } = useParams();
  const [enrolledCourse, setEnrolledCourse] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateFooter({ footerDisplay: "none" }));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/course/${courseId}`)
      .then((res) => setEnrolledCourse(res.data));
  }, []);

  console.log(enrolledCourse);

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
                <input type="text" placeholder="Enter coupon code" />
                <button>Apply</button>
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
                <label>Rs. -0/-</label>
              </div>
            </div>
            <div>
              <hr />
              <div className="payment__window__total">
                <div className="payment__window__feeData">
                  <label>Total Fee</label>
                  <label>
                    Rs. {enrolledCourse.price?.amountAfterDiscount}/-
                  </label>
                </div>
              </div>
              <button className="payment__window__btn">Proceed Payment</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentEnroll;
