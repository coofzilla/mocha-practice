const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  postCount: Number,
});

//name of collection is string auto appends an s at end
//this is also how we create a new model
const User = mongoose.model("user", UserSchema);

module.exports = User;
