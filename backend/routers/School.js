const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const School = require("../model/School");

router.post("/", async (req, res) => {
  if (req.body.image) {
    req.body.image = mongoose.Types.ObjectId(req.body.image);
  }
  const {
    name,
    image,
    principal_name,
    principal_email,
    representative_name,
    representative_email,
    representative_number,
    school_link,
  } = req.body;

  const newSchool = new School({
    name,
    image,
    principal_name,
    principal_email,
    representative_name,
    representative_email,
    representative_number,
    school_link,
  });
  newSchool
    .save()
    .then((doc) => {
      res.status(200).send({ message: "school added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "school not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving schools",
    error: "Bad Request",
  };
  School.aggregate([
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
    .then((schools) => {
      res.status(200).send(schools);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.get("/id/:sid", async (req, res) => {
  const sid = req.params.sid;
  const school = await School.findOne({ _id: sid });
  try {
    if (school) {
      res.status(201).send({ school });
    } else {
      res.status(404).send({ error: "school not found" });
    }
  } catch (e) {
    res.status(404).send({ message: "error", error: e });
  }
});

router.get("/name/:sname", async (req, res) => {
  const sname = req.params.sname;

  const error = {
    message: "Error in retrieving schools",
    error: "Bad Request",
  };

  School.aggregate([
    {
      $match: {
        name: sname,
      },
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
    .then((school) => {
      res.status(200).send(school);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

router.put("/:sid", async (req, res) => {
  try {
    School.findByIdAndUpdate({ _id: req.params.sid }, req.body).then((doc) =>
      res.status(200).send("school updated")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

router.delete("/:sid", async (req, res) => {
  try {
    School.findByIdAndDelete({ _id: req.params.sid }).then((doc) =>
      res.status(200).send("school deleted")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

module.exports = router;
