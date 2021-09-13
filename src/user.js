const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require("./post");

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters",
    },
    required: [true, "Name is required"],
  },
  postCount: Number,
  posts: [PostSchema],
});

//name of collection is string auto appends an s at end
//this is also how we create a new model
const User = mongoose.model("user", UserSchema);

module.exports = User;
