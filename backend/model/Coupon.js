const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  code: String,
  amount: Number,
  active: {
    type: Boolean,
    default: false,
  },
  minAmount: Number,
  frequency: Number,
  usedTimes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("coupon", CouponSchema);
