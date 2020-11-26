const express = require("express");
const router = express.Router();
const Course = require("../../model/Course");
const User = require("../../model/User");
const mongoose = require("mongoose");
const courseGroupRouter = require("./CourseGroup");
const courseLearnRouter = require("./CourseLearn");
const courseBuildRouter = require("./CourseBuild");
const courseInnovateRouter = require("./CourseInnovate");
const courseOutcomeRouter = require("./CourseOutcome");
const courseReviewRouter = require("./CourseReview");
const courseFaqRouter = require("./CourseFaq");
const courseInstructorRouter = require("./CourseInstructor");
const courseBatchRouter = require("./CourseBatch");
const courseclassRouter = require("./CourseClass");
const courseProjectRouter = require("./CourseProject");
const courseDashboardRouter = require("./CourseDashboard");
const courseEnrollRouter = require("./CourseEnroll");
const isAuthenticated = require("../../controller/requestAuthenticator");
const isAuthorized = require("../../controller/requestAuthorizer");

router.use(
  "/learn",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseLearnRouter
);
router.use(
  "/build",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseBuildRouter
);
router.use(
  "/innovate",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseInnovateRouter
);
router.use(
  "/outcome",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseOutcomeRouter
);
router.use(
  "/review",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseReviewRouter
);
router.use("/faq", isAuthenticated, isAuthorized(["admin"]), courseFaqRouter);
router.use(
  "/instructor",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseInstructorRouter
);
router.use(
  "/batch",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseBatchRouter
);
router.use(
  "/class",
  isAuthenticated,
  isAuthorized(["admin", "instructor"]),
  courseclassRouter
);
router.use(
  "/project",
  isAuthenticated,
  isAuthorized(["admin"]),
  courseProjectRouter
);
router.use("/dashboard", isAuthenticated, courseDashboardRouter);
router.use(
  "/enroll",
  isAuthenticated,
  isAuthorized(["student"]),
  courseEnrollRouter
);
router.use("/group", courseGroupRouter);

router.get("/", (req, res) => {
  Course.aggregate([
    {
      $lookup: {
        from: "coursegroups",
        let: { groupId: "$groupId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "courseGroup",
      },
    },
    {
      $unwind: {
        path: "$courseGroup",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { courseImage: "$courseImage" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$courseImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "courseImage",
      },
    },
    {
      $unwind: {
        path: "$courseImage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { courseStructure: "$courseStructure" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$courseStructure"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "courseStructure",
      },
    },
    {
      $unwind: {
        path: "$courseStructure",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$builds",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { buildsImage: "$builds.image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$buildsImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "builds.image",
      },
    },
    {
      $unwind: {
        path: "$builds.image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $first: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $push: "$builds" },
        innovates: { $first: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $first: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
      },
    },
    {
      $unwind: {
        path: "$innovates",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { innovatesImage: "$innovates.image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$innovatesImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "innovates.image",
      },
    },
    {
      $unwind: {
        path: "$innovates.image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $first: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $first: "$builds" },
        innovates: { $push: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $first: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
      },
    },
    {
      $unwind: {
        path: "$reviews",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { reviewsImage: "$reviews.image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$reviewsImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "reviews.image",
      },
    },
    {
      $unwind: {
        path: "$reviews.image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $first: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $first: "$builds" },
        innovates: { $first: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $push: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
      },
    },
    {
      $unwind: {
        path: "$instructors",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { instructors: "$instructors" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$instructors"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
            },
          },
        ],
        as: "instructors",
      },
    },
    {
      $unwind: {
        path: "$instructors",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $push: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $first: "$builds" },
        innovates: { $first: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $first: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
      },
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
              _id: 1,
              startDate: 1,
              endDate: 1,
            },
          },
        ],
        as: "batches",
      },
    },
    {
      $project: {
        groupId: 0,
        __v: 0,
      },
    },
  ])
    .exec()
    .then(async (courses) => {
      res.status(200).send(courses);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error in retrieving the courses" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Course.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "coursegroups",
        let: { groupId: "$groupId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "courseGroup",
      },
    },
    {
      $unwind: {
        path: "$courseGroup",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { courseImage: "$courseImage" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$courseImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "courseImage",
      },
    },
    {
      $unwind: {
        path: "$courseImage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { courseStructure: "$courseStructure" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$courseStructure"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "courseStructure",
      },
    },
    {
      $unwind: {
        path: "$courseStructure",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$builds",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { buildsImage: "$builds.image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$buildsImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "builds.image",
      },
    },
    {
      $unwind: {
        path: "$builds.image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $first: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $push: "$builds" },
        innovates: { $first: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $first: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
        totalClasses: { $first: "$totalClasses" },
      },
    },
    {
      $unwind: {
        path: "$innovates",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { innovatesImage: "$innovates.image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$innovatesImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "innovates.image",
      },
    },
    {
      $unwind: {
        path: "$innovates.image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $first: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $first: "$builds" },
        innovates: { $push: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $first: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
        totalClasses: { $first: "$totalClasses" },
      },
    },
    {
      $unwind: {
        path: "$reviews",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { reviewsImage: "$reviews.image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$reviewsImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "reviews.image",
      },
    },
    {
      $unwind: {
        path: "$reviews.image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $first: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $first: "$builds" },
        innovates: { $first: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $push: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
        totalClasses: { $first: "$totalClasses" },
      },
    },
    {
      $unwind: {
        path: "$instructors",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        let: { instructors: "$instructors" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$instructors"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
            },
          },
        ],
        as: "instructors",
      },
    },
    {
      $unwind: {
        path: "$instructors",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        price: { $first: "$price" },
        level: { $first: "$level" },
        preReq: { $first: "$preReq" },
        instructors: { $push: "$instructors" },
        name: { $first: "$name" },
        description: { $first: "$description" },
        durationInHours: { $first: "$durationInHours" },
        NoOfWeeks: { $first: "$NoOfWeeks" },
        hoursPerWeek: { $first: "$hoursPerWeek" },
        overview: { $first: "$overview" },
        detailedView: { $first: "$detailedView" },
        learns: { $first: "$learns" },
        builds: { $first: "$builds" },
        innovates: { $first: "$innovates" },
        courseImage: { $first: "$courseImage" },
        courseStructure: { $first: "$courseStructure" },
        outcomes: { $first: "$outcomes" },
        reviews: { $first: "$reviews" },
        gradeRange: { $first: "$gradeRange" },
        faqs: { $first: "$faqs" },
        courseGroup: { $first: "$courseGroup" },
        totalClasses: { $first: "$totalClasses" },
      },
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
              _id: 1,
              startDate: 1,
              endDate: 1,
            },
          },
        ],
        as: "batches",
      },
    },
    {
      $project: {
        groupId: 0,
        __v: 0,
      },
    },
  ])
    .exec()
    .then(async (courses) => {
      res.status(200).send(courses[0]);
    })
    .catch((err) => {
      res.status(400).send({ message: "Error in retrieving the course" });
    });
});

// router.get("")

router.post("/", isAuthenticated, isAuthorized(["admin"]), async (req, res) => {
  const getValidatedData = (reqBody) => {
    const reqData = reqBody;
    reqData._id = new mongoose.Types.ObjectId();
    reqData.groupId = mongoose.Types.ObjectId(reqData.groupId);
    reqData.builds = reqData.builds.map((build, idx) => ({
      ...build,
      image: mongoose.Types.ObjectId(build.image),
    }));
    reqData.innovates = reqData.innovates.map((innovate, idx) => ({
      ...innovate,
      image: mongoose.Types.ObjectId(innovate.image),
    }));
    reqData.courseImage = mongoose.Types.ObjectId(reqData.courseImage);
    reqData.courseStructure = mongoose.Types.ObjectId(reqData.courseStructure);
    reqData.instructors = reqData.instructors.map((ins, idx) =>
      mongoose.Types.ObjectId(ins)
    );
    reqData.createdAt = new Date().toISOString();
    return reqData;
  };
  const validatedData = await getValidatedData(req.body);
  const error = { message: "Error in creating course", error: "Bad Request" };

  const courseData = new Course(validatedData);

  await courseData
    .save()
    .then((course) => {
      res.status(201).send({ message: "Course created Succesfully" });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.put(
  "/:id",
  isAuthenticated,
  isAuthorized(["admin"]),
  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);

    Course.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(201).send({ message: "Course updated Succesfully" });
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(400).send(error);
      });
  }
);

module.exports = router;
