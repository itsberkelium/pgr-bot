const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const RaceResult = require("../models/RaceResult");

router.get("/", (req, res) => {
  RaceResult.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  if (!Object.keys(req.body).length) {
    res.json({ response: "Eksik alan girdiniz.", t: 1 });
    return false;
  }

  if (
    Object.keys(req.body).indexOf("circuitId") < 0 ||
    Object.keys(req.body).indexOf("seasonId") < 0 ||
    Object.keys(req.body).indexOf("qualifying") < 0 ||
    Object.keys(req.body).indexOf("race") < 0 ||
    Object.keys(req.body).indexOf("fastestLap") < 0
  ) {
    res.json({
      response: "Eksik alan girdiniz.",
      t: 2,
    });
    return false;
  }

  Object.keys(req.body).some((key) => {
    if (String(req.body[key]) && String(req.body[key]) !== "") return false;
    else {
      res.json({
        response: "Eksik alan girdiniz.",
        t: 3,
        k: key,
        v: req.body[key],
      });
      return true;
    }
  });

  new RaceResult({
    circuitId: mongoose.Types.ObjectId(req.body.circuitId),
    seasonId: mongoose.Types.ObjectId(req.body.seasonId),
    qualifying: req.body.qualifying,
    race: req.body.race,
    fastestLap: req.body.fastestLap,
  })
    .save()
    .then((raceResult) => {
      res.json({ response: "Yarış sonucu eklendi!", raceResult });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
