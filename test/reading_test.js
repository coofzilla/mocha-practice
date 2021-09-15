const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zack;

  beforeEach(async () => {
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    alex = new User({ name: "Alex" });
    zack = new User({ name: "Zack" });

    await joe.save();
    await maria.save();
    await alex.save();
    await zack.save();
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

  it("can skip and limit the result set", async () => {
    const users = await User.find({}).skip(1).limit(2);
    console.log(users);
    assert(users[0].name === "Maria");
    assert(users[1].name === "Alex");
    assert(users.length === 2);
  });
});
