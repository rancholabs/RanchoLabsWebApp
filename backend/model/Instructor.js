const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  password: String,
  domain: String,
  todolist: {
    type: String,
    default: null,
  },
  fname: String,
  lname: String,
  mname: String,
  email: String,
  phoneNumber: String,
  aadharNumber: String,
  panNumber: String,
  joiningDate: Date,
  accountNumber: String,
  accountName: String,
  bankName: String,
  ifscCode: String,
  profileimage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  aadharimage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  panimage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

module.exports = mongoose.model("Instructor", InstructorSchema);
