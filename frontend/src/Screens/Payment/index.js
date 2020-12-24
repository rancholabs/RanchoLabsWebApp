import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CouponIcon from "./images/abed265cd5f621820ce2457d1abc7391@2x.png";
import ClassesIcon from "./images/Icon material-class@2x.png";
import { updateHeader } from "../../Actions/Header";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import PaymentEnroll from "./PaymentEnroll";

function Payment() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updateHeader({
        backgroundColor: "#0A0E2A",
      })
    );
  });
  return (
    <div>
      <PaymentEnroll />
    </div>
  );
}

export default Payment;
