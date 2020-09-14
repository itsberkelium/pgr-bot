const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: String,
  team: { type: mongoose.Types.ObjectId, ref: "Team" },
  psn: String,
  championships: Number,
  active: Boolean,
});

module.exports = mongoose.model("Driver", driverSchema);
