const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
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

  it("can remove an existing subdocument", async () => {
    const joe = await new User({
      name: "Joe",
      posts: [
        {
          title: "Title of Post",
        },
      ],
    });
    await joe.save();
    const user = await User.findOne({ name: "Joe" });
    //remove is not deprecated f/subdocuments
    user.posts[0].remove();
    await user.save();
    assert(user.posts.length === 0);
  });
});
