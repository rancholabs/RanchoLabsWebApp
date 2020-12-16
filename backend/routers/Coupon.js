const express = require("express");
const router = express.Router();
const Coupon = require("../model/Coupon");
const isAuthenticated = require("../controller/requestAuthenticator");
const isAuthorized = require("../controller/requestAuthorizer");

router.post("/", isAuthenticated, isAuthorized(["admin"]), async (req, res) => {
  const { code, amount, minAmount, frequency, active } = req.body;

  const newCoupon = new Coupon({
    code,
    amount,
    minAmount,
    frequency,
    active,
  });
  newCoupon
    .save()
    .then((doc) => {
      res.status(200).send({ message: "coupon added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "coupon not added" });
    });
});

router.get("/", async (req, res) => {
  Coupon.find({}).then((docs) => {
    res.send(docs);
  });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const coupon = await Coupon.findOne({ _id: cid });
  try {
    if (coupon) {
      res.status(201).send({ coupon });
    } else {
      res.status(404).send({ error: "coupon not found" });
    }
  } catch (e) {
    res.status(404).send({ message: "error", error: e });
  }
});

router.get("/code/:code", async (req, res) => {
  const code = req.params.code;
  const coupon = await Coupon.findOne({ code: code });
  try {
    if (coupon) {
      res.status(201).send({ coupon });
    } else {
      res.status(404).send({ error: "coupon not found" });
    }
  } catch (e) {
    res.status(404).send({ message: "error", error: e });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    Coupon.findByIdAndUpdate({ _id: req.params.cid }, req.body).then((doc) =>
      res.status(200).send("coupon updated")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    Coupon.findByIdAndDelete({ _id: req.params.cid }).then((doc) =>
      res.status(200).send("coupon deleted")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

module.exports = router;
