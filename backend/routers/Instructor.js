const express = require("express");
const router = express.Router();
const Instructor = require("../model/Instructor");
const User = require("../model/User");
const Batch = require("../model/Batch");
const StudentCourse = require("../model/StudentCourse");
const isAuthenticated = require("../controller/requestAuthenticator");
const isAuthorized = require("../controller/requestAuthorizer");
const mongoose = require("mongoose");

router.post(
  "/",
  isAuthenticated,
  isAuthorized(["instructor", "admin"]),
  async (req, res) => {
    const info = Object.keys(req.body);
    try {
      var instructor = await Instructor.findOne({ userId: req.userId });
      if (instructor) {
        info.forEach((update) => (instructor[update] = req.body[update]));
        await instructor.save();
        res.status(201).send("Instructor information updated");
      } else {
        const reqData = req.body;
        // reqData.userId = mongoose.Types.ObjectId(req.userId)
        instructor = new Instructor(reqData);
        await instructor
          .save()
          .then((instructor) => {
            res.status(201).send("Instructor information added successfully");
          })
          .catch((err) => {
            res.status(400).send("Error in adding instructor information");
          });
      }
    } catch (e) {
      res.status(400).send("Error in updating instructor information");
    }
  }
);

router.put(
  "/update",
  isAuthenticated,
  isAuthorized(["instructor"]),
  async (req, res) => {
    try {
      console.log("here");
      const updates = Object.keys(req.body);
      const instructor = await Instructor.findOne({ userId: req.userId });
      if (instructor) {
        updates.forEach((update) => {
          instructor[update] = req.body[update];
        });
        await instructor.save();

        res.status(201).send({ instructor });
      } else {
        throw new Error("Instructor not found");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  }
);

router.get(
  "/",
  isAuthenticated,
  isAuthorized(["instructor"]),
  async (req, res) => {
    try {
      var user = await User.findOne({ _id: req.userId });
      var instructor = await Instructor.findOne({ userId: req.userId });
      if (user && instructor) {
        var info = {
          name: user.name,
          mobileNo: user.mobileNo,
          email: user.email,
          password: instructor.password,
          todolist: instructor.todolist,
        };
        res.status(201).send(info);
      } else {
        res.status(400).send("Instructor not Found");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Error in getting instructor information");
    }
  }
);

router.get(
  "/admin",
  isAuthenticated,
  isAuthorized(["admin"]),
  async (req, res) => {
    try {
      // var user = await User.findOne({ role: "instructor" });
      var instructor = await Instructor.find();
      if (instructor) {
        // var info = {
        //   name: user.name,
        //   mobileNo: user.mobileNo,
        //   email: user.email,
        //   password: instructor.password,
        //   todolist: instructor.todolist,
        // };
        res.status(201).send(instructor);
      } else {
        res.status(400).send("Instructor not Found");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send("Error in getting instructor information");
    }
  }
);

router.post(
  "/schedule",
  isAuthenticated,
  isAuthorized(["instructor"]),
  async (req, res) => {
    try {
      const instructorb = await Instructor.findOne({ userId: req.userId });
      const classlist = await Batch.aggregate([
        {
          $match: {
            instructor: instructorb._id,
          },
        },
        {
          $unwind: {
            path: "$classes",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "$StudentCourse",
            localField: "_id",
            foreignField: "batchId",
            as: "students",
          },
        },
        {
          $project: {
            batch: "$name",
            startTime: "$classes.startTime",
            endTime: "$classes.endTime",
            classId: "$classes._id",
            _id: 1,
            students: "$students",
            materials: "$classes.materials",
          },
        },
        {
          $unwind: {
            path: "$students",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "User",
            localField: "userId",
            foreignField: "_id",
            as: "students.details",
          },
        },
        {
          $group: {
            _id: "$_id",
            batch: { $first: "$batch" },
            startTime: { $first: "$startTime" },
            endTime: { $first: "$endTime" },
            students: { $push: "$students" },
            classId: { $first: "$classId" },
            materials: { $first: "$materials" },
          },
        },
        {
          $match: {
            batch: { $in: req.body.batch },
          },
        },
        {
          $sort: {
            startTime: 1,
          },
        },
      ]);

      res.status(201).send({ classes: classlist });
    } catch (e) {
      console.log(e);
      res.status(400).send({ Error: e });
    }
  }
);

module.exports = router;
