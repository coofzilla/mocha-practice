const assert = require("assert");
const User = require("../src/user");

describe("Updating records", async () => {
  let joe;

  beforeEach(async () => {
    joe = await new User({ name: "Joe" });
    await joe.save();
  });

  const assertName = async (operation) => {
    const users = await User.find();
    assert(users.length === 1);
    assert(users[0].name === "Alex");
  };

  it("instance type using set and save", async () => {
    //set only persists the change in memory not to the db
    await joe.set("name", "Alex");
    //need to use save to db
    assertName(await joe.save());
  });

  it("A model instance can update", async () => {
    await joe.updateOne({ name: "Alex" });
    assertName(await joe.save());
  });
});
