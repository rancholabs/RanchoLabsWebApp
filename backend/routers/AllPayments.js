const express = require("express");
const router = express.Router();
const Payment = require("../model/Payment");
const isAuthenticated = require("../controller/requestAuthenticator");
const isAuthorized = require("../controller/requestAuthorizer");

router.get("/", isAuthenticated, isAuthorized(["admin"]), async (req, res) => {
  const error = {
    message: "Error in retrieving batch data",
    error: "Bad Request",
  };
  Payment.aggregate([
    {
      $lookup: {
        from: "coupons",
        let: { couponId: "$couponId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$couponId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              code: 1,
              active: 1,
              usedTimes: 1,
              amount: 1,
              minAmount: 1,
              frequency: 1,
            },
          },
        ],
        as: "couponData",
      },
    },
    {
      $unwind: {
        path: "$couponData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ])
    .exec()
    .then(async (allpayments) => {
      res.status(200).send(allpayments);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

module.exports = router;
