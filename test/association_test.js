const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");
const assert = require("assert");

//caps are the model "class" while lower is the "instance"
describe("Associations", () => {
  let joe, blogPost, comment;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "Joe?", content: "JoeMomma" });
    comment = new Comment({ content: "So funny.." });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    await joe.save();
    await blogPost.save();
    await comment.save();
  });
  //use it.only to run only one test
  it("saves a relation between a user and a blogpost", async () => {
    const user = await User.findOne({ name: "Joe" }).populate("blogPosts");
    assert((user.blogPosts[0].title = "Joe?"));
  });

  it("saves a full relation tree, all of the data", async () => {
    const user = await User.findOne({ name: "Joe" }).populate({
      path: "blogPosts",
      populate: {
        path: "comments",
        model: "comment",
        populate: {
          path: "user",
          model: "user",
        },
      },
    });

    assert(user.name === "Joe");
    assert(user.blogPosts[0].title === "Joe?");
    assert(user.blogPosts[0].content === "JoeMomma");
    assert(user.blogPosts[0].comments[0].content === "So funny..");
    assert(user.blogPosts[0].comments[0].user.name === "Joe");
  });
});
