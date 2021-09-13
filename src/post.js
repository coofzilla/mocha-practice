const mongoose = require("mongoose");
const { Schema } = mongoose;

//emboded documents known as "sub-documents"
const PostSchema = new Schema({
  title: String,
});

module.exports = PostSchema;
