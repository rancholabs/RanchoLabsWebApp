const mongoose = require("mongoose");

const JourneySchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  no_of_classes: {
    type: Number,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

const CourseGroupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  journey: [JourneySchema],
});

module.exports = mongoose.model("CourseGroup", CourseGroupSchema);
