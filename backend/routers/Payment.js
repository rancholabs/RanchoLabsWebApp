const express = require("express");
const router = express.Router();
// const Student = require('../model/Student')
const isAuthenticated = require("../controller/requestAuthenticator");
// const isAuthorized = require('../controller/requestAuthorizer')
const mongoose = require("mongoose");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const { RAZOR_PAY_KEY_ID, RAZOR_PAY_KEY_SECRET } = require("./../config");

const StudentCourse = require("../model/StudentCourse");
const Course = require("../model/Course");
const Coupon = require("../model/Coupon");
const Payment = require("../model/Payment");
const Certificate = require("../model/Certificate");
const { sendMail } = require("../Utils/Email");

const instance = new Razorpay({
  key_id: RAZOR_PAY_KEY_ID,
  key_secret: RAZOR_PAY_KEY_SECRET,
});

let orderData = [];
let certPayData = [];
let youngInnovatorData = [];

const enrollStudent = (student) => {
  let studentCourse;
  if (student.youngInnovatorOrder) {
    studentCourse = new StudentCourse({
      userId: mongoose.Types.ObjectId(student.userId),
      // courseId: courseId,
      // batchId: mongoose.Types.ObjectId(student.batchId),
      payment: student.payment,
    });
  } else {
    const courseId = mongoose.Types.ObjectId(student.courseId);
    studentCourse = new StudentCourse({
      userId: mongoose.Types.ObjectId(student.userId),
      courseId: courseId,
      // batchId: mongoose.Types.ObjectId(student.batchId),
      payment: student.payment,
    });
  }
  studentCourse
    .save()
    .then((sc) => {
      console.log("record added.");
      // Course.aggregate([
      //   {
      //     $match: { _id: courseId },
      //   },
      //   {
      //     $lookup: {
      //       from: "batches",
      //       let: { courseId: "$_id" },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $eq: ["$courseId", "$$courseId"],
      //             },
      //           },
      //         },
      //         {
      //           $project: {
      //             _id: 0,
      //             startDate: 1,
      //           },
      //         },
      //       ],
      //       as: "batch",
      //     },
      //   },
      //   {
      //     $unwind: "$batch",
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       courseName: "$name",
      //       startDate: "$batch.startDate",
      //     },
      //   },
      // ])
      //   .exec()
      //   .then((courses) => {
      //     if (courses[0]) {
      //       console.log("Sending email for new course to ", student.email);
      //       sendMail([student.email], {
      //         type: "COURSE_REGISTERED",
      //         args: courses[0],
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      //   res.status(201).send({ message: "Course Registered Successfully" });
    })
    .catch((err) => {
      console.log(err);
      //   res.status(400).send({
      //     message: "Error in registering the course",
      //     error: "Bad request",
      //   });
    });
};

const updateCoupon = (couponData) => {
  try {
    Coupon.findById(couponData.couponId).then((doc) => {
      Coupon.findByIdAndUpdate(
        { _id: doc._id },
        {
          usedTimes: doc.usedTimes + 1,
        }
      ).then((updatedDoc) => {
        console.log("coupon updated after order");
      });
    });
  } catch (e) {
    console.log(e);
  }
};

const addPaymentObj = (pay, couponId, userId, selectedDate) => {
  const newPayment = new Payment({
    ...pay,
    couponId: couponId,
    userId: userId,
    selectedDate: selectedDate,
  });
  newPayment.save().then((doc) => console.log("payment saved."));
};

const addUserCert = async (usercertdata) => {
  if (usercertdata.userId) {
    usercertdata.userId = mongoose.Types.ObjectId(usercertdata.userId);
  }
  if (usercertdata.courseId) {
    usercertdata.courseId = mongoose.Types.ObjectId(usercertdata.courseId);
  }
  const { name, payment, userId, courseId } = usercertdata;

  const allCerts = await Certificate.find({});

  let certID = "RLCT";
  if (allCerts.length) {
    certID = certID + parseInt(allCerts.length + 1);
  } else {
    certID = certID + "1";
  }

  const newCertificate = new Certificate({
    id: certID,
    name,
    userId,
    courseId,
    payment,
  });
  newCertificate
    .save()
    .then((doc) => {})
    .catch((err) => {
      console.log(err);
    });
};

router.post("/order", isAuthenticated, async (req, res) => {
  const payment_capture = 1;
  const price = req.body.price;
  if (price) {
    const amount = price.amount;
    const currency = price.currencyCode;

    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await instance.orders.create(options);
      console.log(response);
      if (req.body.showYoungInnovator === true) {
        youngInnovatorData.push({
          orderId: response.id,
          userId: req.body.userId,
          email: req.email,
          couponId: req.body.couponId,
          selectedDate: req.body.selectedDate,
        });
      } else if (req.body.reason) {
        certPayData.push({
          orderId: response.id,
          name: req.body.name,
          userId: req.body.userId,
          courseId: req.body.courseId,
        });
      } else {
        orderData.push({
          orderId: response.id,
          batchId: req.body.batchId,
          courseId: req.body.courseId,
          userId: req.body.userId,
          email: req.email,
          couponId: req.body.couponId,
          selectedDate: req.body.selectedDate,
        });
      }
      console.log(orderData);
      console.log(certPayData);
      console.log(youngInnovatorData);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
      res.json({ message: "Error in loading payment screen" });
    }
  } else {
    res.json({
      message: "Error in loading payment screen",
      error: "Bad Request",
    });
  }
});

router.post("/verification", (req, res) => {
  res.json({ status: "ok" });

  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    let userOrder = orderData.filter(
      (singleOrder) =>
        singleOrder.orderId === req.body.payload.payment.entity.order_id
    );
    let userCertOrder = certPayData.filter(
      (singleCertOrder) =>
        singleCertOrder.orderId === req.body.payload.payment.entity.order_id
    );
    let youngInnovatorOrder = youngInnovatorData.filter(
      (singleYoungInnovatorOrder) =>
        singleYoungInnovatorOrder.orderId ===
        req.body.payload.payment.entity.order_id
    );
    if (userOrder.length > 0) {
      userOrder = userOrder[0];
      // ADD RECORD TO STUDENTCOURSE SCHEMA
      const student = {
        batchId: userOrder.batchId,
        courseId: userOrder.courseId,
        userId: userOrder.userId,
        email: userOrder.email,
        payment: {
          paymentId: req.body.payload.payment.entity.id,
          orderId: req.body.payload.payment.entity.order_id,
        },
      };
      enrollStudent(student);
      // CHECK FOR COUPONS
      if (userOrder.couponId !== null) {
        const couponData = {
          couponId: userOrder.couponId,
        };
        updateCoupon(couponData);
      }
      addPaymentObj(
        req.body,
        userOrder.couponId,
        userOrder.userId,
        userOrder.selectedDate
      );
    }
    if (youngInnovatorOrder.length > 0) {
      youngInnovatorOrder = youngInnovatorOrder[0];
      // CHECK FOR COUPONS
      if (youngInnovatorOrder.couponId !== null) {
        const couponData = {
          couponId: youngInnovatorOrder.couponId,
        };
        updateCoupon(couponData);
      }
      // ADD RECORD TO STUDENTCOURSE SCHEMA
      const student = {
        // batchId: youngInnovatorOrder.batchId,
        // courseId: youngInnovatorOrder.courseId,
        userId: youngInnovatorOrder.userId,
        email: youngInnovatorOrder.email,
        youngInnovator: true,
        payment: {
          paymentId: req.body.payload.payment.entity.id,
          orderId: req.body.payload.payment.entity.order_id,
        },
      };
      enrollStudent(student);
      addPaymentObj(
        req.body,
        youngInnovatorOrder.couponId,
        youngInnovatorOrder.userId,
        youngInnovatorOrder.selectedDate
      );
    }
    if (userCertOrder.length > 0) {
      userCertOrder = userCertOrder[0];
      // ADD NEW RECORD IN ALL CERTIFICATES SCHEMA WITH PAYMENT DETAILS
      const certOBJ = {
        payment: {
          paymentId: req.body.payload.payment.entity.id,
          orderId: req.body.payload.payment.entity.order_id,
        },
        name: userCertOrder.name,
        courseId: userCertOrder.courseId,
        userId: userCertOrder.userId,
      };
      addUserCert(certOBJ);
    }
    console.log(req.body);
  } else {
    // pass it
  }
});

router.get("/", (req, res) => {
  res.send("payment api rancho labs");
});

module.exports = router;
