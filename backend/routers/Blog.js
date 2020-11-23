const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const File = require("../model/File");

router.post("/", async (req, res) => {
  if (req.body.blogBanner) {
    req.body.blogBanner = mongoose.Types.ObjectId(req.body.blogBanner);
  }
  const {
    blogTitle,
    blogCategory,
    blogShortDescription,
    blogDate,
    blogBody,
    blogBanner,
  } = req.body;

  const newBlog = new Blog({
    blogTitle,
    blogCategory,
    blogShortDescription,
    blogDate,
    blogBody,
    blogBanner,
  });
  newBlog
    .save()
    .then((doc) => {
      res.status(200).send({ message: "blog added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "blog not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  Blog.aggregate([
    {
      $lookup: {
        from: "files",
        let: { blogBanner: "$blogBanner" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$blogBanner"],
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
    .then((blog) => {
      res.status(200).send(blog);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
  //   const blog = await Blog.find({});
  //   try {
  //     if (blog) {
  //       const allBlogs = await Promise.all(
  //         blog.map(async (singleBlog) => {
  //           var singleBlogOBJ = await File.find({ _id: singleBlog.blogBanner });
  //           return { ...singleBlog, bannerURL: singleBlogOBJ[0].filePath };
  //         })
  //       );
  //       res.status(201).send({ allBlogs });
  //     } else {
  //       res.status(404).send({ error: "blogs found" });
  //     }
  //   } catch (e) {
  //     res.status(404).send({ message: "error", error: e });
  //   }
});

router.get("/:bid", async (req, res) => {
  const bid = req.params.bid;
  const blog = await Blog.findOne({ _id: bid });
  try {
    if (blog) {
      res.status(201).send({ blog });
    } else {
      res.status(404).send({ error: "blog not found" });
    }
  } catch (e) {
    res.status(404).send({ message: "error", error: e });
  }
});

// router.put("/:bid/:cid", async (req, res) => {
//   try {
//     const batch = await Batch.findOne({ _id: req.params.bid });
//     const clas = batch.classes.filter((c) => {
//       if (c.classId == req.params.cid) return c;
//     });
//     const updates = Object.keys(req.body);
//     updates.forEach((update) => {
//       if (update === "instructorNote") {
//         clas[0].instructorNote.push(req.body[update]);
//       } else {
//         clas[0][update] = req.body[update];
//       }
//     });
//     await batch.save();
//     res.status(201).send(clas);
//   } catch (e) {
//     console.log(e);
//     res.status(400).send("Error");
//   }
// });

module.exports = router;
