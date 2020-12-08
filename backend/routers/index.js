const express = require("express");
const router = express.Router();
const authRouter = require("./Auth");
const fileRouter = require("./File");
const freeworkshopRouter = require("./FreeWorkshop");
const userRouter = require("./User");
const courseRouter = require("./Course");
const quoteRouter = require("./Quote");
const studentRouter = require("./Student");
const profileRouter = require("./Profile");
const paymentRouter = require("./Payment");
const contactRouter = require("./Contact");
const instructorRouter = require("./Instructor");
const batchRouter = require("./Batch");
const blogRouter = require("./Blog");
const blogFileRouter = require("./BlogFile");
const blogAuthorRouter = require("./BlogAuthor");
const blogCategoryRouter = require("./BlogCategory");
const schoolRouter = require("./School");

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
router.use("/profile", profileRouter);
router.use("/payment", paymentRouter);
router.use("/about", contactRouter);
router.use("/instructor", instructorRouter);
router.use("/batch", batchRouter);
router.use("/blog", blogRouter);
router.use("/blogfile", blogFileRouter);
router.use("/blogauthor", blogAuthorRouter);
router.use("/blogcategory", blogCategoryRouter);
router.use("/school", schoolRouter);

module.exports = router;
