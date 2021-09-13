const assert = require("assert");
const User = require("../src/user");

describe("Creating Records", async () => {
  it("saves a user", async () => {
    const joe = await new User({ name: "Joe" });

    await joe.save();
    assert(!joe.isNew);
  });
});
