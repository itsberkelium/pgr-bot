const mongoose = require("mongoose");
const config = require("../config.json");

module.exports = () => {
  mongoose.connect(config.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on("open", () => console.log("MongoDB: Connected"));

  mongoose.connection.on("error", (err) => console.log("MongoDB: Error", err));

  mongoose.Promise = global.Promise;
};
