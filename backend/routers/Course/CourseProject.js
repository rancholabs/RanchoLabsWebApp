const express = require("express");
const router = express.Router();
const Project = require("../../model/Project");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  let projects = req.body ? req.body : [];
  projects = projects.map((project, idx) => {
    project.courseId = mongoose.Types.ObjectId(project.courseId);
    if (project.image) {
      project.image = mongoose.Types.ObjectId(project.image);
    }
    return project;
  });
  const error = {
    message: "Error in adding course projects",
    error: "Bad Request",
  };
  Project.insertMany(projects)
    .then((projects) => {
      res.status(201).send({ message: "Course projects added Succesfully" });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(req.body, id);
  const updateData = req.body ? req.body : {};
  if (updateData.image) {
    updateData.image = mongoose.Types.ObjectId(updateData.image);
  }
  Project.updateOne({ _id: id }, { $set: updateData }, (err, raw) => {
    if (err) {
      console.log(err);
      res.send(500).send(err);
    } else {
      const { nModified: n } = raw;
      res.status(204).send({
        message:
          n > 0 ? `Course project updated Succesfully` : "No Changes detected",
      });
    }
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const error = {
    message: "Error in deleting course project",
    error: "Bad Request",
  };
  Project.deleteOne({ _id: id }, (err, raw) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      const { nModified: n } = raw;
      res.status(204).send({
        message:
          n > 0 ? `Course project deleted Succesfully` : "No Changes detected",
      });
    }
  });
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const error = {
    message: "Error in getting course project",
    error: "Bad Request",
  };
  Project.find({ courseId: cid }, (err, data) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/all", async (req, res) => {
  const cid = req.params.cid;
  const error = {
    message: "Error in getting course project",
    error: "Bad Request",
  };
  Project.aggregate([
    {
      $lookup: {
        from: "files",
        let: { image: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$image"],
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
        as: "mainimage",
      },
    },
    {
      $unwind: {
        path: "$mainimage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { image_Student: "$image_Student" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$image_Student"],
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
        as: "studentimage",
      },
    },
    {
      $unwind: {
        path: "$studentimage",
        preserveNullAndEmptyArrays: true,
      },
    },
    // {
    //   $group: {
    //     _id: "$_id",
    //     courseId: { $first: "$courseId" },
    //     no: { $first: "$no" },
    //     name: { $first: "$name" },
    //     mainimage: { $first: "$mainimage" },
    //     studentimage: { $first: "$studentimage" },
    //     question: { $first: "$question" },
    //     deadline: { $first: "$deadline" },
    //     image: { $first: "$image" },
    //     image_Student: { $first: "$image_Student" },
    //     format_submit: { $first: "$format_submit" },
    //   },
    // },
    {
      $project: {
        _id: 1,
        courseId: 1,
        no: 1,
        name: 1,
        question: 1,
        deadline: 1,
        image: 1,
        image_Student: 1,
        format_submit: 1,
        mainimage: 1,
        studentimage: 1,
      },
    },
  ])
    .exec()
    .then((allprojects) => {
      // console.log(allprojects);
      res.status(200).send(allprojects);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.get("/single/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const error = {
    message: "Error in getting course project",
    error: "Bad Request",
  };
  // Project.findById(id)
  //   .then((doc) => {
  //     res.send(doc);
  //   })
  //   .catch((err) => console.log(err));
  Project.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: "files",
        let: { image: "$image" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$image"],
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
        as: "mainimage",
      },
    },
    {
      $unwind: {
        path: "$mainimage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "files",
        let: { image_Student: "$image_Student" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$image_Student"],
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
        as: "studentimage",
      },
    },
    {
      $unwind: {
        path: "$studentimage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        courseId: 1,
        no: 1,
        name: 1,
        question: 1,
        deadline: 1,
        image: 1,
        image_Student: 1,
        format_submit: 1,
        mainimage: 1,
        studentimage: 1,
      },
    },
  ])
    .exec()
    .then((allprojects) => {
      // console.log(allprojects);
      res.status(200).send(allprojects);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

module.exports = router;
