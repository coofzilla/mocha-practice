const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", async () => {
  let joe;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    await joe.save();
  });

  it("finds all users with a name of joe", async () => {
    const users = await User.find({ name: "Joe" });
    assert(users[0]._id.toString() === joe._id.toString());
    //these are not actually same same; object holding string
    // console.log(users[0]._id);
    // console.log(joe._id);
  });

  it("finds a user with a particular id", async () => {
    //mongoose expects object for criteria of search
    const user = await User.findOne({ _id: joe._id });
    assert(user.name === "Joe");
  });
});
