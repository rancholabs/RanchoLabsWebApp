const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  startTime: Date,
  endTime: Date,
  quizDeadline: Date,
  instructorNote: [String],
  materials: {
    link: {
      type: Boolean,
      default: false,
    },
    slides: {
      type: Boolean,
      default: false,
    },
    assignments: {
      type: Boolean,
      default: false,
    },
    quiz: {
      type: Boolean,
      default: false,
    },
  },
});

const ProjectSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  deadline: Date,
});

const dateTimeSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});

const BatchSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  gradeRange: {
    minG: {
      type: Number,
      required: true,
    },
    maxG: {
      type: Number,
      required: true,
    },
  },
  date_time: [dateTimeSchema],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  classes: [ClassSchema],
  projects: [ProjectSchema],
  batch_link: String,
});

module.exports = mongoose.model("Batch", BatchSchema);
