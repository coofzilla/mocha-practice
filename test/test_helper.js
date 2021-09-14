const mongoose = require("mongoose");
const keys = require("../config/dev");

//async/await or done w/promises
before(async () => {
  mongoose.connect(keys.mongoURI);

  mongoose.connection
    .once("open", () => console.log("Good to go!"))
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

//this is why your data insn't saving
//mongoose normalizes by lowercasing everything
beforeEach(async () => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop();
    });
  });
});
