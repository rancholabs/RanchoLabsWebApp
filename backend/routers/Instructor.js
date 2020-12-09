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

router.put(
  "/updateadmin",
  isAuthenticated,
  isAuthorized(["admin"]),
  async (req, res) => {
    try {
      console.log("here");
      const updates = Object.keys(req.body);
      const instructor = await Instructor.findOne({ userId: req.body.userId });
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
          profileimage: instructor.profileimage,
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
        // {
        //   $unwind: {
        //     path: "$classes",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $lookup: {
            from: "studentcourses",
            let: { batchId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$batchId", "$$batchId"],
                  },
                },
              },
              {
                $project: {
                  userId: 1,
                },
              },
            ],
            as: "students",
          },
        },
        {
          $lookup: {
            from: "classes",
            let: { courseId: "$courseId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$courseId", "$$courseId"],
                  },
                },
              },
              {
                $project: {
                  __v: 0,
                  courseId: 0,
                },
              },
            ],
            as: "classesDetails",
          },
        },
        {
          $unwind: {
            path: "$classesDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "projects",
            let: { courseId: "$courseId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$courseId", "$$courseId"],
                  },
                },
              },
              {
                $project: {
                  __v: 0,
                  courseId: 0,
                },
              },
            ],
            as: "projectsDetails",
          },
        },
        {
          $unwind: {
            path: "$projectsDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            batch: "$name",
            batchType: 1,
            startTime: "$classes.startTime",
            endTime: "$classes.endTime",
            startDate: 1,
            endDate: 1,
            singleDate: 1,
            singleTime: 1,
            doubleDate: 1,
            doubleTime: 1,
            date_time: 1,
            // classId: "$classes.classId",
            classes: 1,
            projects: 1,
            _id: 1,
            students: "$students",
            classesDetails: 1,
            projectsDetails: 1,
            // materials: "$classes.materials",
            // attendance: "$classes.attendance",
          },
        },
        // {
        //   $match: {
        //     batch: { $in: req.body.batch },
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "classes",
        //     let: { classId: "$classId" },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $eq: ["$_id", "$$classId"],
        //           },
        //         },
        //       },
        //       {
        //         $project: {
        //           attendance: 1,
        //           classLink: 1,
        //         },
        //       },
        //     ],
        //     as: "classDetails",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$classDetails",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        {
          $unwind: {
            path: "$students",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userId: "$students.userId" },
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
                  name: 1,
                },
              },
            ],
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
            // classDetails: { $first: "$classDetails" },
            materials: { $first: "$materials" },
            attendance: { $first: "$attendance" },
            batchType: { $first: "$batchType" },
            startDate: { $first: "$startDate" },
            endDate: { $first: "$endDate" },
            singleDate: { $first: "$singleDate" },
            singleTime: { $first: "$singleTime" },
            doubleDate: { $first: "$doubleDate" },
            doubleTime: { $first: "$doubleTime" },
            date_time: { $first: "$date_time" },
            classes: { $first: "$classes" },
            projects: { $first: "$projects" },
            classesDetails: { $push: "$classesDetails" },
            projectsDetails: { $push: "$projectsDetails" },
          },
        },
        // {
        //   $project: {
        //     _id: 1,
        //     students: 1,
        //     batch: 1,
        //     batchId: 1,
        //     classes: 1,
        //     projects: 1,
        //     batchClasses: "$batch.classes",
        //     batchProjects: "$batch.projects",
        //     progressClasses: "$progress.learns",
        //     progressProjects: "$progress.builds",
        //     innovations: "$progress.innovations",
        //   },
        // },
        {
          $sort: {
            startTime: 1,
          },
        },
      ]);

      let classes = classlist;

      let getMergedDataClasses = (arr1, arr2) => {
        let map = new Map();
        arr2.forEach((item) => map.set(item.userId.toString(), item));
        arr1.forEach((item) =>
          map.set(item.userId.toString(), {
            ...map.get(item.userId.toString()),
            ...item,
          })
        );
        return Array.from(map.values());
      };
      classes = classes.map((clas) => {
        if (
          clas.classDetails &&
          clas.classDetails.attendance &&
          clas.classDetails.attendance.length &&
          clas.students &&
          clas.students.every((s) => {
            if (s.userId) return true;
          })
        ) {
          clas.students = clas.students.map((s) => {
            s.present = false;
            return s;
          });
          clas.students = getMergedDataClasses(
            clas.classDetails.attendance,
            clas.students
          );
          delete clas.classDetails.attendance;
        }
        return clas;
      });

      res.status(201).send({ classes: classlist });

      // res.status(201).send({ classes: classlist });
    } catch (e) {
      console.log(e);
      res.status(400).send({ Error: e });
    }
  }
);

module.exports = router;
