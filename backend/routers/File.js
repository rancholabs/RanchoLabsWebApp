const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("../model/File");
const isAuthenticated = require("../controller/requestAuthenticator");
const {
  awsS3Storage,
  awsS3DeleteFile,
} = require("../controller/storageController");

const upload = multer({ storage: awsS3Storage });

router.get("/", isAuthenticated, (req, res) => {
  const error = {
    message: "Error in retreiving the files",
    error: "Bad Request",
  };
  File.find({ createdBy: req.userId })
    .select({ originalName: 1, filePath: 1, mimeType: 1, size: 1 })
    .exec()
    .then((files) => {
      res.send(files);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(error);
    });
});

router.get("/:id", isAuthenticated, (req, res) => {
  const error = {
    message: "Error in retreiving the file",
    error: "Bad Request",
  };
  const id = mongoose.Types.ObjectId(req.params.id);
  File.find({ createdBy: req.userId, _id: id })
    .select({ originalName: 1, filePath: 1, mimeType: 1, size: 1 })
    .exec()
    .then((files) => {
      res.send(files[0]);
    })
    .catch((er) => {
      console.log(err);
      res.status(500).send(error);
    });
});

router.post("/", isAuthenticated, upload.single("files"), async (req, res) => {
  const file = req.files;
  console.log(req.file);
  console.log(req.files);
  //   const fileData = new File({
  //     _id: new mongoose.Types.ObjectId(),
  //     originalName: file.originalname,
  //     mimeType: file.mimetype,
  //     filePath: file.location,
  //     size: file.size,
  //     createdBy: req.userId,
  //     createdAt: new Date().toISOString(),
  //   });

  //   await fileData
  //     .save()
  //     .then((doc) => {
  //       res.status(201).send({ fileId: doc._id });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).send({ message: "Error adding file" });
  //     });
});

router.post(
  "/multiple",
  isAuthenticated,
  upload.array("files", 12),
  (req, res) => {
    const files = req.files;
    if (!files) {
      res.status(400).send({ message: "Please choose files" });
    }
    const filePromise = new Promise(async (resolve, reject) => {
      let resFileNames = [];
      let resErrors = [];
      await Promise.all(
        files.map(async (file) => {
          const fileData = new File({
            _id: new mongoose.Types.ObjectId(),
            originalName: file.originalname,
            mimeType: file.mimetype,
            filePath: file.location,
            size: file.size,
            createdBy: req.userId,
            createdAt: new Date().toISOString(),
          });

          await fileData
            .save()
            .then((doc) => {
              resFileNames.push({ fileId: doc._id });
            })
            .catch((err) => {
              console.log(err);
              resErrors.push({ message: "Error adding file" });
            });
        })
      );
      resolve({
        status: resFileNames.length === files.length,
        filesUploaded: resFileNames,
        errors: resErrors,
      });
    });

    filePromise
      .then((resp) => res.status(201).send(resp))
      .catch((err) => res.send("Error in adding files"));
  }
);

router.put("/:id", isAuthenticated, (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const fileName = req.body ? req.body.fileName : "";
  const error = { message: "Error in updating the file", error: "Bad Request" };
  if (fileName) {
    File.updateOne({ _id: id }, { originalName: fileName }, (err, raw) => {
      if (err) {
        console.log(err);
        res.status(500).send(error);
      } else {
        const { nModified: n } = raw;
        res.status(204).send({
          message: n > 0 ? `Updated ${n} docs` : "No Changes detected",
        });
      }
    });
  } else {
    res.status(500).send(error);
  }
});

router.delete("/:id", isAuthenticated, (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const query = { _id: id };
  const error = { message: "Error in deleting the file", error: "Bad Request" };
  const deleteFileFromDb = () => {
    File.deleteOne(query, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(error);
      } else {
        res
          .status(204)
          .send({ message: "File deleted successfully", status: true });
      }
    });
  };
  File.findOne(query)
    .exec()
    .then((file) => {
      if (!file || file === undefined)
        res
          .status(500)
          .send({ status: "error", message: "Unable to find the file id" });
      else {
        awsS3DeleteFile(file.filePath, deleteFileFromDb);
      }
    });
});

module.exports = router;
