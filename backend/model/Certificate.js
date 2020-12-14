const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  id: String,
  name: {
    first: {
      type: String,
      default: null,
    },
    last: {
      type: String,
      default: null,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("certificate", CertificateSchema);
