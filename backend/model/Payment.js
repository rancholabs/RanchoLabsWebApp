const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  entity: {
    type: String,
  },
  account_id: {
    type: String,
  },
  event: {
    type: String,
  },
  contains: {
    type: Array,
  },
  payload: {
    type: Object,
  },
  created_at: Date,
  couponId: String,
  userId: String,
  selectedDate: String,
});

module.exports = mongoose.model("payment", PaymentSchema);
