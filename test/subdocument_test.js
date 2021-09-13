const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", async () => {
  it("can create a subdocument", async () => {
    const joe = await new User({
      name: "Joe",
      posts: [
        {
          title: "PostTitle",
        },
      ],
    });

    await joe.save();
    const user = await User.findOne({ name: "Joe" });
    assert(user.posts[0].title === "PostTitle");
  });

  it("can add subdocuments to an existing record", async () => {
    const joe = await new User({
      name: "Joe",
      posts: [],
    });
    await joe.save();
    const user = await User.findOne({ name: "Joe" });
    user.posts.push({ title: "New Post" });
    await user.save();
    assert(user.posts[0].title === "New Post");
  });
});
