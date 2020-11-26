const express = require("express");
const router = express.Router();
const CourseGroup = require("../../model/CourseGroup");
const mongoose = require("mongoose");
const isAuthenticated = require("../../controller/requestAuthenticator");
const isAuthorized = require("../../controller/requestAuthorizer");

router.post("/", isAuthenticated, isAuthorized(["admin"]), async (req, res) => {
  const error = {
    message: "Error in creating course group",
    error: "Bad Request",
  };
  const name = req.body.name;
  const image = req.body.image;
  var journey = req.body.journey;

  if (journey) {
    journey = journey.map((jour, idx) => {
      if (jour.image) {
        jour.image = mongoose.Types.ObjectId(jour.image);
      }
      return jour;
    });
  }

  const courseGroupData = new CourseGroup({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    image: new mongoose.Types.ObjectId(image),
    journey: journey,
  });
  await courseGroupData
    .save()
    .then((courseGroup) => {
      res.status(201).send({ message: "Course Group created Succesfully" });
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
    const id = req.params.id;
    const error = {
      message: "Error in updating course group",
      error: "Bad Request",
    };
    const updateData = req.body;
    if (updateData.image)
      updateData.image = new mongoose.Types.ObjectId(updateData.image);

    if (updateData.journey) {
      updateData.journey.map((jour, idx) => {
        if (jour.image) {
          jour.image = mongoose.Types.ObjectId(jour.image);
        }
      });
    }

    CourseGroup.updateOne({ _id: id }, updateData, (err, raw) => {
      if (err) {
        console.log(err);
        res.send(500).send(error);
      } else {
        const { nModified: n } = raw;
        res.status(204).send({
          message:
            n > 0 ? `Course group updated successfully` : "No Changes detected",
        });
      }
    });
  }
);

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving course groups",
    error: "Bad Request",
  };
  CourseGroup.aggregate([
    {
      $lookup: {
        from: "files",
        let: { groupImage: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupImage"],
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
        as: "image",
      },
    },
    {
      $unwind: {
        path: "$image",
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
    .then((courseGroups) => {
      res.status(200).send(courseGroups);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.get("/courseList", async (req, res) => {
  const error = {
    message: "Error in retrieving course groups",
    error: "Bad Request",
  };
  CourseGroup.aggregate([
    {
      $lookup: {
        from: "files",
        let: { groupImage: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupImage"],
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
        as: "image",
      },
    },
    {
      $unwind: {
        path: "$image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "courses",
        let: { groupId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$groupId", "$$groupId"],
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
              price: 1,
              level: 1,
              durationInHours: 1,
              outcomesByTopics: 1,
              gradeRange: 1,
              courseStructure: 1,
              totalClasses: 1,
              curriculumPDF: 1,
              websiteEnabled: 1,
            },
          },
        ],
        as: "courses",
      },
    },
    {
      $unwind: {
        path: "$courses",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { courseStructure: "$courses.courseStructure" },
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
        as: "courses.courseStructure",
      },
    },
    {
      $unwind: {
        path: "$courses.courseStructure",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        image: { $first: "$image" },
        journey: { $first: "$journey" },
        courses: { $push: "$courses" },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        journey: 1,
        courses: {
          $filter: {
            input: "$courses",
            as: "course",
            cond: { $gt: ["$$course", {}] },
          },
        },
      },
    },
  ])
    .exec()
    .then(async (courseGroups) => {
      await courseGroups.forEach((cg) => {
        cg.courses.forEach((course, index) => {
          if (!course.websiteEnabled) {
            delete cg[index];
          }
        });
      });
      res.status(200).send(courseGroups);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

// FOR ADMIN ALL COURSES ARE SHOWN
router.get("/courseListAdmin", async (req, res) => {
  const error = {
    message: "Error in retrieving course groups",
    error: "Bad Request",
  };
  CourseGroup.aggregate([
    {
      $lookup: {
        from: "files",
        let: { groupImage: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupImage"],
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
        as: "image",
      },
    },
    {
      $unwind: {
        path: "$image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "courses",
        let: { groupId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$groupId", "$$groupId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              price: 1,
              level: 1,
              durationInHours: 1,
              outcomesByTopics: 1,
              gradeRange: 1,
              courseStructure: 1,
              totalClasses: 1,
              curriculumPDF: 1,
              websiteEnabled: 1,
            },
          },
        ],
        as: "courses",
      },
    },
    {
      $unwind: {
        path: "$courses",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { courseStructure: "$courses.courseStructure" },
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
        as: "courses.courseStructure",
      },
    },
    {
      $unwind: {
        path: "$courses.courseStructure",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        image: { $first: "$image" },
        journey: { $first: "$journey" },
        courses: { $push: "$courses" },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        journey: 1,
        courses: {
          $filter: {
            input: "$courses",
            as: "course",
            cond: { $gt: ["$$course", {}] },
          },
        },
      },
    },
  ])
    .exec()
    .then((courseGroups) => {
      res.status(200).send(courseGroups);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const error = {
    message: "Error in retrieving course group",
    error: "Bad Request",
  };
  CourseGroup.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "files",
        let: { groupImage: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupImage"],
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
        as: "image",
      },
    },
    {
      $unwind: "$image",
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((courseGroups) => {
      res.status(200).send(courseGroups[0]);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.get("/courseList/:id", async (req, res) => {
  const id = req.params.id;
  const error = {
    message: "Error in retrieving course group",
    error: "Bad Request",
  };
  CourseGroup.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "files",
        let: { groupImage: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$groupImage"],
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
        as: "image",
      },
    },
    {
      $unwind: "$image",
    },
    {
      $lookup: {
        from: "courses",
        let: { groupId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$groupId", "$$groupId"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              price: 1,
              level: 1,
              durationInHours: 1,
              outcomesByTopics: 1,
              gradeRange: 1,
              courseStructure: 1,
            },
          },
        ],
        as: "courses",
      },
    },
    {
      $unwind: "$courses",
    },
    {
      $lookup: {
        from: "files",
        let: { courseStructure: "$courses.courseStructure" },
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
        as: "courses.courseStructure",
      },
    },
    {
      $unwind: "$courses.courseStructure",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        image: { $first: "$image" },
        courses: { $push: "$courses" },
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((courseGroups) => {
      res.status(200).send(courseGroups[0]);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

module.exports = router;
