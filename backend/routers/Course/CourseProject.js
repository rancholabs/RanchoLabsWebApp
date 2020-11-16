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
  const updateData = req.body ? req.body : {};
  if (updateData.image) {
    updateData.image = mongoose.Types.ObjectId(updateData.image);
  }
  Project.updateOne({ _id: id }, { $set: updateData }, (err, raw) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      const { nModified: n } = raw;
      res
        .status(204)
        .send({
          message:
            n > 0
              ? `Course project updated Succesfully`
              : "No Changes detected",
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
      res
        .status(204)
        .send({
          message:
            n > 0
              ? `Course project deleted Succesfully`
              : "No Changes detected",
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

module.exports = router;
