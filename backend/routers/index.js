const express = require("express");
const router = express.Router();
const authRouter = require("./Auth");
const fileRouter = require("./File");
const freeworkshopRouter = require("./FreeWorkshop");
const userRouter = require("./User");
const courseRouter = require("./Course");
const quoteRouter = require("./Quote");
const studentRouter = require("./Student");
const paymentRouter = require("./Payment");
const contactRouter = require("./Contact");
const instructorRouter = require("./Instructor");
const batchRouter = require("./Batch");
const blogRouter = require("./Blog");

router.get("/", (req, res) => {
  res.send("Welcome to Rancho Labs API");
});

router.use(authRouter);
router.use("/file", fileRouter);
router.use("/workshop/free", freeworkshopRouter);
router.use("/course", courseRouter);
router.use("/user", userRouter);
router.use("/quote", quoteRouter);
router.use("/student", studentRouter);
router.use("/payment", paymentRouter);
router.use("/about", contactRouter);
router.use("/instructor", instructorRouter);
router.use("/batch", batchRouter);
router.use("/blog", blogRouter);

module.exports = router;
