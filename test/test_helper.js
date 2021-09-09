const mongoose = require("mongoose");
const keys = require("../config/dev");

mongoose.connect(keys.mongoURI);
mongoose.connection
  .once("open", () => console.log("Good to go!"))
  .on("error", (error) => {
    console.warn("Warning", error);
  });
