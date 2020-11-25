const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  blogTitle: String,
  blogCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogcategory",
  },
  blogShortDescription: String,
  blogDate: String,
  blogBody: String,
  blogBanner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  blogAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogauthors",
  },
});

module.exports = mongoose.model("blog", BlogSchema);
