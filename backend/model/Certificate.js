const mongoose = require("mongoose");

const PaymentSchema = {
  paymentId: {
    type: String,
    default: null,
  },
  orderId: {
    type: String,
    default: null,
  },
  signature: {
    type: String,
    default: null,
  },
};

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
  from: {
    type: String,
    default: null,
  },
  to: {
    type: String,
    default: null,
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
  payment: PaymentSchema,
});

module.exports = mongoose.model("certificate", CertificateSchema);
