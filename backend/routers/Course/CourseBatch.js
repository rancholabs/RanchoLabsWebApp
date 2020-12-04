const express = require("express");
const router = express.Router();
const Batch = require("../../model/Batch");
const Class = require("../../model/Class");
const Project = require("../../model/Project");
const mongoose = require("mongoose");
const { sendMail } = require("../../Utils/Email");

router.post("/:cid", async (req, res) => {
  const cid = mongoose.Types.ObjectId(req.params.cid);
  let batches = req.body ? req.body : [];
  batches = batches.map((batch, idx) => ({ ...batch, courseId: cid }));
  const error = {
    message: "Error in adding course batches",
    error: "Bad Request",
  };
  Class.find({ courseId: cid })
    .select({ _id: 1 })
    .then((classes) => {
      const uClasses = classes.map((clas, idx) => {
        const c = {};
        c.classId = clas._id;
        return c;
      });
      batches = batches.map((batch, idx) => ({ ...batch, classes: uClasses }));
      Project.find({ courseId: cid })
        .then((projects) => {
          const uProjects = projects.map((project, idx) => {
            const p = {};
            p.projectId = project._id;
            return p;
          });
          batches = batches.map((batch, idx) => ({
            ...batch,
            projects: uProjects,
          }));
          Batch.insertMany(batches)
            .then(async (batch) => {
              const addedBatch = await Batch.find({
                instructor: batch[0].instructor,
                courseId: batch[0].courseId,
                name: batch[0].name,
              });
              res.status(201).json({
                message: "Course batches added Succesfully",
                id: addedBatch[0]._id,
              });
            })
            .catch((err) => {
              console.log("Error:", err);
              res.status(400).send(error);
            });
        })
        .catch((err) => {
          console.log("Error:", err);
          res.status(400).send(error);
        });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.put("/class/:bid/:cid", async (req, res) => {
  const bid = mongoose.Types.ObjectId(req.params.bid);
  const cid = mongoose.Types.ObjectId(req.params.cid);
  const reqData = req.body ? req.body : {};
  const error = {
    message: "Error in updating course class",
    error: "Bad Request",
  };
  let hasStartTime = false;
  if (Object.keys(reqData).length > 0) {
    const updateData = {};
    if (reqData.startTime) {
      hasStartTime = true;
      updateData["classes.$.startTime"] = reqData.startTime;
    }
    if (reqData.endTime) {
      updateData["classes.$.endTime"] = reqData.endTime;
    }
    if (reqData.quizDeadline) {
      updateData["classes.$.quizDeadline"] = reqData.quizDeadline;
    }
    Batch.updateOne({ _id: bid, "classes.classId": cid }, { $set: updateData })
      .then((raw) => {
        const { nModified: n } = raw;
        if (n > 0 && hasStartTime) {
          Batch.aggregate([
            {
              $match: { _id: bid },
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
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      courseName: "$name",
                    },
                  },
                ],
                as: "course",
              },
            },
            {
              $unwind: "$course",
            },
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
                      _id: 0,
                      userId: "$userId",
                    },
                  },
                ],
                as: "users",
              },
            },
            {
              $unwind: "$users",
            },
            {
              $lookup: {
                from: "users",
                let: { userId: "$users.userId" },
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
                      _id: 0,
                      email: 1,
                    },
                  },
                ],
                as: "users.email",
              },
            },
            {
              $unwind: "$users.email",
            },
            {
              $project: {
                courseName: "$course.courseName",
                users: "$users.email",
              },
            },
            {
              $group: {
                _id: "$_id",
                courseName: { $first: "$courseName" },
                users: { $push: "$users" },
              },
            },
            {
              $project: {
                _id: 0,
                courseName: "$courseName",
                users: "$users",
              },
            },
          ])
            .exec()
            .then((courses) => {
              if (courses[0]) {
                const emails = courses[0].users.map((user) => {
                  if (user.email) {
                    return user.email;
                  }
                });
                sendMail(emails, {
                  type: "CLASSTIME_UPDATED",
                  args: {
                    courseName: courses[0].courseName,
                    startDate: reqData.startTime,
                  },
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        res.status(204).send({
          message:
            n > 0 ? `Course class updated Succesfully` : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(500).send(error);
      });
  } else {
    res.send(500).send(error);
  }
});

router.put("/project/:bid/:pid", async (req, res) => {
  const bid = mongoose.Types.ObjectId(req.params.bid);
  const pid = mongoose.Types.ObjectId(req.params.pid);
  const reqData = req.body ? req.body : {};
  const error = {
    message: "Error in updating course project",
    error: "Bad Request",
  };
  if (Object.keys(reqData).length > 0) {
    const updateData = {};
    if (reqData.isActive) {
      updateData["projects.$.isActive"] = reqData.isActive;
    }
    if (reqData.deadline) {
      updateData["projects.$.deadline"] = reqData.deadline;
    }
    Batch.updateOne(
      { _id: bid, "projects.projectId": pid },
      { $set: updateData }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(204).send({
          message:
            n > 0
              ? `Course project updated Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(500).send(error);
      });
  } else {
    res.send(500).send(error);
  }
});

router.delete("/:bid", async (req, res) => {
  const bid = req.params.bid;
  const error = {
    message: "Error in deleting course batch",
    error: "Bad Request",
  };
  Batch.deleteOne({ _id: bid }, (err, raw) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      const { nModified: n } = raw;
      res.status(204).send({
        message:
          n > 0 ? `Course batch deleted Succesfully` : "No Changes detected",
      });
    }
  });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const error = {
    message: "Error in getting course batch",
    error: "Bad Request",
  };
  Batch.find({ courseId: cid }, (err, data) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });

  // const error = {
  //   message: "Error in retrieving schools",
  //   error: "Bad Request",
  // };

  // Batch.aggregate([
  //   {
  //     $match: {
  //       courseId: cid,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "files",
  //       let: { image: "$image" },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $eq: ["$_id", "$$image"],
  //             },
  //           },
  //         },
  //         {
  //           $project: {
  //             filePath: 1,
  //             _id: 1,
  //             originalName: 1,
  //           },
  //         },
  //       ],
  //       as: "image",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$image",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $project: {
  //       __v: 0,
  //     },
  //   },
  // ])
  //   .exec()
  //   .then((school) => {
  //     res.status(200).send(school);
  //   })
  //   .catch((err) => {
  //     console.log("Error:", err);
  //     res.status(400).send(error);
  //   });
});

router.put("/:bid", async (req, res) => {
  const bid = req.params.bid;
  const error = {
    message: "Error in getting course batch",
    error: "Bad Request",
  };
  Batch.findByIdAndUpdate({ _id: bid }, req.body).then((doc) =>
    res.send("Batch updated")
  );
});

module.exports = router;
