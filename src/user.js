const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
});

//name of collection is string auto appends an s at end
const User = mongoose.model("user", UserSchema);

module.exports = User;
