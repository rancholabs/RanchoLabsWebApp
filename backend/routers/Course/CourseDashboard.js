const express = require("express");
const router = express.Router();
const StudentProgress = require("../../model/StudentProgress");
const StudentCourse = require("../../model/StudentCourse");
const File = require("../../model/File");
const mongoose = require("mongoose");
const { getQuote } = require("../../Utils/Quote");

router.get("/", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  StudentCourse.find({ userId: userId }).select({ courseId: 1, batchId: 1 });
  StudentCourse.aggregate([
    {
      $match: { userId: userId },
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
              groupId: 1,
              name: 1,
              isWorkshop: 1,
            },
          },
        ],
        as: "courseDetails",
      },
    },
    {
      $unwind: {
        path: "$courseDetails",
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
        as: "classes",
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
              // _id: 1,
              // courseId: 1,
              // name: 1,
              // no: 1,
              // question: 1,
              // deadline: 1,
              // format_submit: 1,
              __v: 0,
              courseId: 0,
            },
          },
        ],
        as: "projects",
      },
    },

    // {
    //   $unwind: {
    //     path: "$projects",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
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
            },
          },
          {
            $project: {
              //   classes: {
              //     $map: {
              //       input: "$classes",
              //       as: "c",
              //       in: {
              //         classId: "$$c.classId",
              //         classTime: {
              //           startTime: "$$c.startTime",
              //           endTime: "$$c.endTime",
              //         },
              //         quizDeadline: "$$c.quizDeadline",
              //       },
              //     },
              //   },
              classes: 1,
              projects: 1,
              batchType: 1,
              startDate: 1,
              endDate: 1,
              singleDate: 1,
              singleTime: 1,
              doubleDate: 1,
              doubleTime: 1,
              batch_link: 1,
            },
          },
        ],
        as: "batch",
      },
    },
    {
      $unwind: {
        path: "$batch",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "studentprogresses",
        let: { batchId: "$batchId", userId: "$userId" },
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $expr: {
                    $eq: ["$batchId", "$$batchId"],
                  },
                },
                {
                  $expr: {
                    $eq: ["$userId", "$$userId"],
                  },
                },
              ],
            },
          },
          {
            $project: {
              learns: {
                $map: {
                  input: "$learns",
                  as: "l",
                  in: {
                    classId: "$$l.classId",
                    quizProgress: "$$l.quiz",
                  },
                },
              },
              builds: {
                $map: {
                  input: "$builds",
                  as: "b",
                  in: {
                    projectId: "$$b.projectId",
                    assignmentProgress: "$$b.assignment",
                  },
                },
              },
              innovations: "$innovates",
            },
          },
        ],
        as: "progress",
      },
    },
    {
      $unwind: {
        path: "$progress",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        courseId: 1,
        courseDetails: 1,
        batch: 1,
        batchId: 1,
        classes: 1,
        projects: 1,
        batchClasses: "$batch.classes",
        batchProjects: "$batch.projects",
        progressClasses: "$progress.learns",
        progressProjects: "$progress.builds",
        innovations: "$progress.innovations",
      },
    },
  ])
    .then(async (courses) => {
      const quote = await getQuote();
      courses = await Promise.all(
        courses.map(async (course) => {
          course.classes = await Promise.all(
            course.classes.map(async (clas) => {
              if (clas.materials) {
                if (clas.materials.lesson) {
                  clas.materials.lesson = await File.findOne({
                    _id: clas.materials.lesson,
                  })
                    .select({
                      _id: 1,
                      originalName: 1,
                      filePath: 1,
                    })
                    .then((file) => file)
                    .catch((err) => {});
                }
                if (clas.materials.video) {
                  clas.materials.video = await File.findOne({
                    _id: clas.materials.video,
                  })
                    .select({
                      _id: 1,
                      originalName: 1,
                      filePath: 1,
                    })
                    .then((file) => file)
                    .catch((err) => {});
                }
                if (clas.materials.references) {
                  clas.materials.references = await Promise.all(
                    clas.materials.references.map(async (ref) => {
                      if (ref.refType === "file") {
                        ref.file = await File.findOne({ _id: ref.file })
                          .select({
                            _id: 1,
                            originalName: 1,
                            filePath: 1,
                          })
                          .then((file) => file)
                          .catch((err) => {});
                      }
                      return ref;
                    })
                  );
                }
              }
              return clas;
            })
          );
          if (course.projects) {
            course.projects = await Promise.all(
              course.projects.map(async (project) => {
                if (project.image) {
                  project.image = await File.findOne({ _id: project.image })
                    .select({
                      _id: 1,
                      originalName: 1,
                      filePath: 1,
                    })
                    .then((file) => file)
                    .catch((err) => {});
                }
                if (project.image_Student) {
                  project.image_Student = await File.findOne({
                    _id: project.image_Student,
                  })
                    .select({
                      _id: 1,
                      originalName: 1,
                      filePath: 1,
                    })
                    .then((file) => file)
                    .catch((err) => {});
                }
                return project;
              })
            );
          }
          if (course.innovations) {
            course.innovations = await Promise.all(
              course.innovations.map(async (innovation) => {
                if (innovation.video) {
                  innovation.video = await File.findOne({
                    _id: innovation.video,
                  })
                    .select({
                      _id: 1,
                      originalName: 1,
                      filePath: 1,
                    })
                    .then((file) => file)
                    .catch((err) => {});
                }
                if (innovation.steps) {
                  innovation.steps = innovation.steps.map(async (step, idx) => {
                    if (step.image) {
                      step.image = await File.findOne({ _id: step.image })
                        .select({
                          _id: 1,
                          originalName: 1,
                          filePath: 1,
                        })
                        .then((file) => file)
                        .catch((err) => {});
                    }
                    return step;
                  });
                }
                return innovation;
              })
            );
          }
          let getMergedDataClasses = (arr1, arr2) => {
            let map = new Map();
            arr2.forEach((item) => map.set(item.classId.toString(), item));
            arr1.forEach((item) =>
              map.set(item._id.toString(), {
                ...map.get(item._id.toString()),
                ...item,
              })
            );
            return Array.from(map.values());
          };
          let getMergedDataProjects = (arr1, arr2) => {
            let map = new Map();
            arr2.forEach((item) => map.set(item.projectId.toString(), item));
            arr1.forEach((item) =>
              map.set(item._id.toString(), {
                ...map.get(item._id.toString()),
                ...item,
              })
            );
            return Array.from(map.values());
          };
          if (course.batchClasses)
            course.classes = getMergedDataClasses(
              course.classes,
              course.batchClasses
            );
          if (course.progressClasses)
            course.classes = getMergedDataClasses(
              course.classes,
              course.progressClasses
            );
          if (course.batchProjects)
            course.projects = getMergedDataProjects(
              course.projects,
              course.batchProjects
            );
          if (course.progressProjects)
            course.projects = getMergedDataProjects(
              course.projects,
              course.progressProjects
            );
          // course.projects = course.projects.filter((p) => {
          //   if (p.isActive) {
          //     return p;
          //   }
          // });
          delete course.batchClasses;
          delete course.batchProjects;
          delete course.progressClasses;
          delete course.progressProjects;
          return course;
        })
      );
      const data = { quote: quote, courses: courses };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error in retreiving course data" });
    });
});

router.post("/learn/:batchId", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const batchId = mongoose.Types.ObjectId(req.params.batchId);
  const error = {
    message: "Error in adding student course learn",
    error: "Bad Request",
  };
  if (req.body && req.body.classId) {
    const classData = {
      ...req.body,
      classId: mongoose.Types.ObjectId(req.body.classId),
    };
    StudentProgress.updateOne(
      { userId: userId, batchId: batchId },
      { $push: { learns: classData } },
      { upsert: true }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(201).send({
          message:
            n > 0
              ? `Student course learn added Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send(error);
  }
});

router.put("/learn/:batchId/:classId", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const batchId = mongoose.Types.ObjectId(req.params.batchId);
  const classId = mongoose.Types.ObjectId(req.params.classId);
  const reqData = req.body;
  const error = {
    message: "Error in updating student course learn",
    error: "Bad Request",
  };
  if (reqData && reqData.quiz && Object.keys(reqData.quiz).length > 0) {
    const updateData = {};
    if (reqData.quiz.isCompleted !== undefined) {
      updateData["learns.$.quiz.isCompleted"] = reqData.quiz.isCompleted;
    }
    if (reqData.quiz.completedOn) {
      updateData["learns.$.quiz.completedOn"] = reqData.quiz.completedOn;
    }
    if (reqData.quiz.score) {
      updateData["learns.$.quiz.score"] = reqData.quiz.score;
    }
    StudentProgress.updateOne(
      { userId: userId, batchId: batchId, "learns.classId": classId },
      { $set: updateData }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(204).send({
          message:
            n > 0
              ? `Student course learn updated Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send(error);
  }
});

router.post("/build/:batchId", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const batchId = mongoose.Types.ObjectId(req.params.batchId);
  const error = {
    message: "Error in adding student course build",
    error: "Bad Request",
  };
  if (req.body && req.body.projectId) {
    let projectData = {
      ...req.body,
      projectId: mongoose.Types.ObjectId(req.body.projectId),
    };
    if (projectData.assignment && projectData.assignment.file) {
      projectData.assignment.file = mongoose.Types.ObjectId(
        projectData.assignment.file
      );
    }
    StudentProgress.updateOne(
      { userId: userId, batchId: batchId },
      { $push: { builds: projectData } },
      { upsert: true }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(201).send({
          message:
            n > 0
              ? `Student course build added Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send(error);
  }
});

router.put("/learn/:batchId/:projectId", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const batchId = mongoose.Types.ObjectId(req.params.batchId);
  const projectId = mongoose.Types.ObjectId(req.params.projectId);
  const reqData = req.body;
  const error = {
    message: "Error in updating student course learn",
    error: "Bad Request",
  };
  if (
    reqData &&
    reqData.assignment &&
    Object.keys(reqData.assignment).length > 0
  ) {
    const updateData = {};
    if (reqData.assignment.isSubmitted !== undefined) {
      updateData["builds.$.assignment.isSubmitted"] =
        reqData.assignment.isSubmitted;
    }
    if (reqData.assignment.file) {
      updateData["builds.$.assignment.file"] = mongoose.Types.ObjectId(
        reqData.assignment.file
      );
    }
    if (reqData.assignment.submittedOn) {
      updateData["builds.$.assignment.submittedOn"] =
        reqData.assignment.submittedOn;
    }
    if (reqData.assignment.score) {
      updateData["builds.$.assignment.score"] = reqData.assignment.score;
    }
    StudentProgress.updateOne(
      { userId: userId, batchId: batchId, "builds.projectId": projectId },
      { $set: updateData }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(204).send({
          message:
            n > 0
              ? `Student course learn updated Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send(error);
  }
});

router.post("/innovate/:batchId", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const batchId = mongoose.Types.ObjectId(req.params.batchId);
  let innovateData = req.body;
  const error = {
    message: "Error in adding student course innovation",
    error: "Bad Request",
  };
  if (innovateData) {
    if (innovateData.video) {
      innovateData.video = mongoose.Types.ObjectId(innovateData.video);
    }
    if (innovateData.steps) {
      innovateData.steps = innovateData.steps.map((data, idx) => ({
        ...data,
        image: mongoose.Types.ObjectId(data.image),
      }));
    }
    StudentProgress.updateOne(
      { userId: userId, batchId: batchId },
      { $push: { innovates: { $each: innovateData } } }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(201).send({
          message:
            n > 0
              ? `Student course innovation added Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send(error);
  }
});

router.put("/innovate/:batchId/:innovationId", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const batchId = mongoose.Types.ObjectId(req.params.batchId);
  const innovationId = mongoose.Types.ObjectId(req.params.innovationId);
  const reqData = req.body;
  const error = {
    message: "Error in updating student course learn",
    error: "Bad Request",
  };
  if (reqData) {
    StudentProgress.updateOne(
      { userId: userId, batchId: batchId, "innovates._id": innovationId },
      { $set: reqData }
    )
      .then((raw) => {
        const { nModified: n } = raw;
        res.status(204).send({
          message:
            n > 0
              ? `Student course learn updated Succesfully`
              : "No Changes detected",
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send(error);
  }
});

module.exports = router;
