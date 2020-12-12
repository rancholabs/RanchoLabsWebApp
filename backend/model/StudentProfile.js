const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  header: {
    heading: String,
    category: String,
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  },
  brief: String,
  components: [
    {
      id: Number,
      value: String,
    },
  ],
  steps: [
    {
      id: Number,
      heading: String,
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      description: String,
    },
  ],
  conclusion: [
    {
      id: Number,
      heading: String,
      subHeading: String,
      image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      description: String,
    },
  ],
  isUploaded: {
    type: Boolean,
    default: false,
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
});

const SkillSchema = {
  id: Number,
  skill: String,
  level: {
    type: String,
    enum: ["expert", "intermediate", "beginner"],
    default: "beginner",
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
};

const CourseSchema = {
  id: Number,
  heading: String,
  category: String,
  description: String,
  isEnabled: {
    type: Boolean,
    default: false,
  },
};

const CertificateSchema = {
  id: Number,
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
};

const StudentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  aim: String,
  extraCurriculars: [String],
  skills: [SkillSchema],
  projects: [ProjectSchema],
  innovations: [ProjectSchema],
  courses: [CourseSchema],
  certificates: [CertificateSchema],
});

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
