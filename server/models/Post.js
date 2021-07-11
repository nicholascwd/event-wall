const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  assetURL: {
    type: String,
  },
  cdnURL: {
    type: String,
  },
  message: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Post = (module.exports = mongoose.model("Post", PostSchema, "posts"));
