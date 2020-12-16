import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CouponIcon from "./images/abed265cd5f621820ce2457d1abc7391@2x.png";
import ClassesIcon from "./images/Icon material-class@2x.png";
import { updateFooter } from "../../Actions/Footer";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import PaymentEnroll from "./PaymentEnroll";

function Payment() {
  return (
    <div>
      <PaymentEnroll />
    </div>
  );
}

export default Payment;
