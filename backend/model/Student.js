const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const ParentSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
  mobileNo: {
    code: String,
    number: String,
  },
});

const FreeEnrollmentSchema = new mongoose.Schema({
  freeClass: {
    enrolled: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  freeWorkshop: {
    enrolled: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
});

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  mobileNo: {
    code: String,
    number: String,
  },
  grade: {
    type: Number,
    min: 6,
    max: 12,
  },
  location: String,
  schoolDetails: SchoolSchema,
  parentDetails: ParentSchema,
  freeEnrollment: FreeEnrollmentSchema,
  loginfor: String,
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
  },
});

module.exports = mongoose.model("Student", StudentSchema);
