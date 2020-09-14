const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
  name: String,
  dChampion: mongoose.Types.ObjectId,
  tChampion: mongoose.Types.ObjectId,
});

module.exports = mongoose.model("Season", seasonSchema);
