const express = require("express");
const router = express.Router();
const Class = require("../../model/Class");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  let classes = req.body ? req.body : [];
  classes = classes.map((clas, idx) => {
    clas.courseId = mongoose.Types.ObjectId(clas.courseId);
    if (clas.materials) {
      if (clas.materials.lesson) {
        clas.materials.lesson = mongoose.Types.ObjectId(clas.materials.lesson);
      }
      if (clas.materials.video) {
        clas.materials.video = mongoose.Types.ObjectId(clas.materials.video);
      }
      if (clas.materials.references) {
        clas.materials.references = clas.materials.references.map(
          (ref, idx) => {
            if (ref.file) {
              ref.file = mongoose.Types.ObjectId(ref.file);
            }
            return ref;
          }
        );
      }
    }
    return clas;
  });
  const error = {
    message: "Error in adding course classes",
    error: "Bad Request",
  };
  Class.insertMany(classes)
    .then((classes) => {
      res.status(201).send({ message: "Course classes added Succesfully" });
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  // const updateData = req.body ? req.body : {};
  // if (updateData.materials) {
  //   if (updateData.materials.lesson) {
  //     updateData.materials.lesson = mongoose.Types.ObjectId(
  //       updateData.materials.lesson
  //     );
  //   }
  //   if (updateData.materials.video) {
  //     updateData.materials.video = mongoose.Types.ObjectId(
  //       updateData.materials.video
  //     );
  //   }
  //   if (updateData.materials.references) {
  //     updateData.materials.references = updateData.materials.references.map(
  //       (ref, idx) => {
  //         if (ref.file) {
  //           ref.file = mongoose.Types.ObjectId(ref.file);
  //         }
  //         return ref;
  //       }
  //     );
  //   }
  // }
  // console.log(req.body);
  Class.findByIdAndUpdate(id, req.body)
    .then((doc) => {
      res.status(204).send("Class updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });

  // , (err, raw) => {
  //   if (err) {
  //     console.log(err);
  //     res.send(500).send(err);
  //   } else {
  //     const { nModified: n } = raw;
  //     res.status(204).send({
  //       message:
  //         n > 0 ? `Course class updated Succesfully` : "No Changes detected",
  //     });
  //   }
  // });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const error = {
    message: "Error in deleting course class",
    error: "Bad Request",
  };
  Class.deleteOne({ _id: id }, (err, raw) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      const { nModified: n } = raw;
      res.status(204).send({
        message:
          n > 0 ? `Course class deleted Succesfully` : "No Changes detected",
      });
    }
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const error = {
    message: "Error in getting course class",
    error: "Bad Request",
  };
  Class.find({ courseId: id }, (err, data) => {
    if (err) {
      console.log(error);
      res.send(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
