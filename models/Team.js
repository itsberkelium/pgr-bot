const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  title: String,
  championships: Number,
  color: String,
  order: Number,
});

module.exports = mongoose.model("Team", teamSchema);
