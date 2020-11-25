const mongoose = require("mongoose");

const BlogCategory = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("blogcategory", BlogCategory);
