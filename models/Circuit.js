const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const circuitSchema = new Schema({
  name: String,
  location: String,
  record: mongoose.Types.ObjectId,
});

module.exports = mongoose.model("Circuit", circuitSchema);
