const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  blogTitle: String,
  blogCategory: String,
  blogShortDescription: String,
  blogDate: String,
  blogBody: String,
  blogBanner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

module.exports = mongoose.model("blog", BlogSchema);
