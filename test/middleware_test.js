const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost;

  beforeEach(async () => {
    //leave await off new creation
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "Joe?", content: "JoeMomma" });

    joe.blogPosts.push(blogPost);

    await joe.save();
    await blogPost.save();
  });

  it("users clean up dangling blogposts on remove", async () => {
    await joe.deleteOne();
    const count = await BlogPost.countDocuments();
    assert(count === 0);
  });
});
