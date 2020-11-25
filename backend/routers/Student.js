const express = require("express");
const router = express.Router();
const Student = require("../model/Student");
const isAuthenticated = require("../controller/requestAuthenticator");
const isAuthorized = require("../controller/requestAuthorizer");
const mongoose = require("mongoose");

router.post(
  "/",
  isAuthenticated,
  isAuthorized(["student"]),
  async (req, res) => {
    const info = Object.keys(req.body);
    try {
      var student = await Student.findOne({ userId: req.userId });
      if (student) {
        info.forEach((update) => (student[update] = req.body[update]));
        await student.save();
        res.status(201).send("Student information updated");
      } else {
        const reqData = req.body;
        reqData.userId = mongoose.Types.ObjectId(req.userId);
        student = new Student(reqData);
        await student
          .save()
          .then((student) => {
            res.status(201).send("Student information added successfully");
          })
          .catch((err) => {
            res.status(400).send("Error in adding student information");
          });
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Error in updating student information");
    }
  }
);

router.get(
  "/",
  isAuthenticated,
  isAuthorized(["student"]),
  async (req, res) => {
    try {
      const student = await Student.findOne({ userId: req.userId });
      if (student) {
        res.status(201).send({
          loginfor: student.loginfor,
          freeEnrollment: student.freeEnrollment,
        });
      } else {
        res.status(400).send("Student not found");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get(
  "/all",
  isAuthenticated,
  isAuthorized(["admin"]),
  async (req, res) => {
    const error = {
      message: "Error in retrieving blogs",
      error: "Bad Request",
    };
    Student.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                mode: 1,
                mobileNo: 1,
                role: 1,
                createdAt: 1,
              },
            },
          ],
          as: "studentDetails",
        },
      },
      {
        $unwind: {
          path: "$studentDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ])
      .exec()
      .then((blog) => {
        res.status(200).send(blog);
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  }
);

module.exports = router;
