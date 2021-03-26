const express = require("express");
const router = express.Router();
const StudentCourse = require("../../model/StudentCourse");
const Course = require("../../model/Course");
const mongoose = require("mongoose");
const { sendMail } = require("../../Utils/Email");

router.post("/", async (req, res) => {
  const courseId = mongoose.Types.ObjectId(req.body.courseId);
  const studentCourse = new StudentCourse({
    userId: mongoose.Types.ObjectId(req.userId),
    courseId: courseId,
    batchId: mongoose.Types.ObjectId(req.body.batchId),
    payment: req.body.payment,
  });
  studentCourse
    .save()
    .then((sc) => {
      Course.aggregate([
        {
          $match: { _id: courseId },
        },
        {
          $lookup: {
            from: "batches",
            let: { courseId: "$_id" },
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
                  _id: 0,
                  startDate: 1,
                },
              },
            ],
            as: "batch",
          },
        },
        {
          $unwind: "$batch",
        },
        {
          $project: {
            _id: 0,
            courseName: "$name",
            startDate: "$batch.startDate",
          },
        },
      ])
        .exec()
        .then((courses) => {
          if (courses[0]) {
            sendMail([req.email], {
              type: "COURSE_REGISTERED",
              args: courses[0],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      res.status(201).send({ message: "Course Registered Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        message: "Error in registering the course",
        error: "Bad request",
      });
    });
});

router.put("/admin", async (req, res) => {
  if (req.body.paymentObj) {
    StudentCourse.findOneAndUpdate(
      {
        payment: req.body.paymentObj,
      },
      {
        batchId: req.body.batchId,
      }
    )
      .then((sc) => {
        res.status(201).send({ message: "Course Batch Assigned Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          message: "Error in registering the course",
          error: "Bad request",
        });
      });
  } else {
    StudentCourse.find({
      // courseId: req.body.courseId,
      userId: req.body.userId ? req.body.userId : req.userId,
      batchId: req.body.batchId,
    }).then((doc) => {
      if (doc && doc.length > 0) {
        // UPDATE
        console.log("update");
      }
    });
  }
});
router.post("/admin", async (req, res) => {
  if (req.body.paymentObj) {
    StudentCourse.findOneAndUpdate(
      {
        payment: req.body.paymentObj,
      },
      {
        batchId: req.body.batchId,
      }
    )
      .then((sc) => {
        res.status(201).send({ message: "Course Batch Assigned Successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          message: "Error in registering the course",
          error: "Bad request",
        });
      });
  } else {
    StudentCourse.find({
      // courseId: req.body.courseId,
      userId: req.body.userId ? req.body.userId : req.userId,
      batchId: req.body.batchId,
    }).then((doc) => {
      if (doc && doc.length > 0) {
        // UPDATE
        console.log("update");
      } else {
        // NEW
        console.log("new");
        const courseId = req.body.courseId
          ? mongoose.Types.ObjectId(req.body.courseId)
          : null;
        const studentCourse = new StudentCourse({
          userId: mongoose.Types.ObjectId(
            req.body.userId ? req.body.userId : req.userId
          ),
          courseId: courseId,
          batchId: mongoose.Types.ObjectId(req.body.batchId),
          payment: req.body.payment,
        });
        studentCourse
          .save()
          .then((sc) => {
            res
              .status(201)
              .send({ message: "Course Batch Assigned Successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send({
              message: "Error in registering the course",
              error: "Bad request",
            });
          });
      }
    });
  }
});

router.get("/", (req, res) => {
  StudentCourse.find({ userId: mongoose.Types.ObjectId(req.userId) })
    .select({ courseId: 1 })
    .exec()
    .then((courses) => {
      res.status(200).send(courses);
    })
    .catch((err) => {
      res.status(400).send({ message: "Error in retreiving the user courses" });
    });
});

router.delete("/deleteuser/:_sid", (req, res) => {
  console.log("removing student batch from course enroll");
  StudentCourse.findByIdAndDelete({
    _id: req.params._sid,
  })
    .then((courses) => {
      console.log(courses);
      res.status(200).send("User Course deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error in retreiving the user courses" });
    });
});

router.delete("/deletebatch/:bid", (req, res) => {
  console.log("deleting entire batch from course enroll");
  StudentCourse.find({ batchId: req.params.bid }).then((docs) => {
    docs.forEach((bat) => {
      StudentCourse.findByIdAndDelete(bat._id)
        .then((courses) => {
          console.log("batch deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    res.status(200).send("batch deleted");
  });
});

router.get("/all", (req, res) => {
  const error = {
    message: "Error in retrieving batch data",
    error: "Bad Request",
  };
  StudentCourse.aggregate([
    {
      $lookup: {
        from: "batches",
        let: { batchId: "$batchId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$batchId"],
              },
              // $expr: {
              //   $eq: ["$websiteEnabled", true],
              // },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              courseId: 1,
              startDate: 1,
              endDate: 1,
              singleDate: 1,
              singleTime: 1,
              gradeRange: 1,
              date_time: 1,
              instructor: 1,
              classes: 1,
              projects: 1,
              batch_link: 1,
              batchType: 1,
            },
          },
        ],
        as: "batchData",
      },
    },
    {
      $unwind: {
        path: "$batchData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "courses",
        let: { courseId: "$courseId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$courseId"],
              },
              // $expr: {
              //   $eq: ["$websiteEnabled", true],
              // },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "courseData",
      },
    },
    {
      $unwind: {
        path: "$courseData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ])
    .exec()
    .then(async (batches) => {
      res.status(200).send(batches);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

module.exports = router;
