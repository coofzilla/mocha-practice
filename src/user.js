const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require("./post");

//posts exits f/subdocument example
//blog posts exist f/ref example
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters",
    },
    required: [true, "Name is required"],
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost",
    },
  ],
});
//Virtual is a property that is not stored in MongoDB.
//typically used for computed properties on documents.
UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

//name of collection is string auto appends an s at end
//this is also how we create a new model
const User = mongoose.model("user", UserSchema);

module.exports = User;
