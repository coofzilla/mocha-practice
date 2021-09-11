const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", async () => {
  let joe;

  beforeEach(async () => {
    joe = await new User({ name: "Joe" });
    await joe.save();
  });

  it("modal instance remove", async () => {
    await joe.deleteOne();
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });

  it("class method remove", async () => {
    //delete a bunch of records w/criteria
    await User.deleteMany({ name: "Joe" });
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });

  it("class method findAndRemove", async () => {
    await User.findOneAndRemove({ name: "Joe" });
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });

  it("class method findByIdAndRemove", async () => {
    await User.findByIdAndRemove(joe._id);
    const user = await User.findOne({ name: "Joe" });
    assert(user === null);
  });
});
