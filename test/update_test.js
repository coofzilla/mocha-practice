const assert = require("assert");
const User = require("../src/user");

//remember instance is the specific "instance" of a model and a class is all of them
describe("Updating records", () => {
  let joe;

  beforeEach(async () => {
    joe = await new User({ name: "Joe", postCount: 0 });
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

  it("A model class can update", async () => {
    assertName(await User.updateMany({ name: "Joe" }, { name: "Alex" }));
  });

  it("A model class can update one record", async () => {
    assertName(await User.updateOne({ name: "Joe" }, { name: "Alex" }));
  });

  it("A model class can find an ID and update", async () => {
    assertName(await joe._id, { name: "Alex" });
  });

  xit("a user can have their postCount incremented by 1", async () => {
    await User.updateMany({ name: "Joe" }, { $inc: { postCount: 10 } });
    const user = await User.findOne({ name: "Joe" });
    assert(user.postCount === 10);
  });
});
