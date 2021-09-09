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

beforeEach(async () => {
  mongoose.connection.collections.users.drop(() => {
    //Ready to run next test
  });
});
