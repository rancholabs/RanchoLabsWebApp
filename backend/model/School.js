const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  name: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  principal_name: String,
  principal_email: String,
  representative_name: String,
  representative_email: String,
  representative_number: String,
  school_link: String,
});

module.exports = mongoose.model("School", SchoolSchema);
