const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const raceResultSchema = new Schema({
  circuitId: mongoose.Types.ObjectId,
  seasonId: mongoose.Types.ObjectId,
  qualifying: Array,
  race: Array,
  fastestLap: mongoose.Types.ObjectId,
  penalties: Array,
});

module.exports = mongoose.model("RaceResult", raceResultSchema);
