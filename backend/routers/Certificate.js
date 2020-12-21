const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Certificate = require("../model/Certificate");

router.post("/", async (req, res) => {
  if (req.body.file) {
    req.body.file = mongoose.Types.ObjectId(req.body.file);
  }
  if (req.body.userId) {
    req.body.userId = mongoose.Types.ObjectId(req.body.userId);
  }
  if (req.body.courseId) {
    req.body.courseId = mongoose.Types.ObjectId(req.body.courseId);
  }
  const { name, file, userId, courseId } = req.body;

  const allCerts = await Certificate.find({});

  let certID = "RLCT";
  if (allCerts.length) {
    certID = certID + parseInt(allCerts.length + 1);
  } else {
    certID = certID + "1";
  }

  const newCertificate = new Certificate({
    id: certID,
    name,
    file,
    userId,
    courseId,
  });
  newCertificate
    .save()
    .then((doc) => {
      res.status(200).send({ message: "Certificate added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "Certificate not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  Certificate.aggregate([
    {
      $lookup: {
        from: "courses",
        let: { courseId: "$courseId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$groupId", "$$courseId"],
              },
            },
          },
          {
            $project: {
              name: 1,
              groupId: 1,
              _id: 1,
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
    {
      $lookup: {
        from: "users",
        let: { userId: "$userId" },
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
              _id: 1,
              email: 1,
            },
          },
        ],
        as: "userData",
      },
    },
    {
      $unwind: {
        path: "$userData",
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
    .then((certificates) => {
      res.status(200).send(certificates);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.post("/verify", (req, res) => {
  const { userId, courseId, name, payment } = req.body;
  Certificate.find({
    userId: userId,
    courseId: courseId,
    name: name,
    payment: payment,
  })
    .then((doc) => {
      if (doc.length > 0) {
        res.send("Valid payment");
      } else {
        res.status(404).send("invalid payment");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("server error");
    });
});

router.get("/single/:id", (req, res) => {
  const certId = req.params.id;
  Certificate.find({ id: certId }).then((docs) => {
    if (docs.length > 0) {
      res.send(docs);
    } else {
      res.status(404).send("Not found!");
    }
  });
});

router.put("/", (req, res) => {
  const { userId, courseId, name, payment, file } = req.body;
  Certificate.findOneAndUpdate(
    {
      userId: userId,
      courseId: courseId,
      name: name,
      payment: payment,
    },
    {
      file: file,
    }
  )
    .then((doc) => {
      res.send("certificate updated!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("server error");
    });
});

// router.get("/:bid", async (req, res) => {
//   const bid = req.params.bid;
//   const blog = await Blog.findOne({ _id: bid });
//   try {
//     if (blog) {
//       res.status(201).send({ blog });
//     } else {
//       res.status(404).send({ error: "blog not found" });
//     }
//   } catch (e) {
//     res.status(404).send({ message: "error", error: e });
//   }
// });

// router.put("/:bid", async (req, res) => {
//   try {
//     Blog.findByIdAndUpdate({ _id: req.params.bid }, req.body).then((doc) =>
//       res.status(200).send("Blog updated")
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(400).send("Error");
//   }
// });

// router.delete("/:bid", async (req, res) => {
//   try {
//     Blog.findByIdAndDelete({ _id: req.params.bid }).then((doc) =>
//       res.status(200).send("Blog deleted")
//     );
//   } catch (e) {
//     console.log(e);
//     res.status(400).send("Error");
//   }
// });

module.exports = router;
