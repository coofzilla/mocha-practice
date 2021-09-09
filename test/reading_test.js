const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe;
  beforeEach(async () => {
    joe = new User({ name: "Joe" });

    await joe.save();
  });

  it("finds all users with a name of joe", async () => {
    const response = await User.find({ name: "Joe" });
    console.log(response);
  });
});
