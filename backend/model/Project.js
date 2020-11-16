const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  no: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  deadline: {
    type: Number,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  image_Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  format_submit: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
