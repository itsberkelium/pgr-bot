const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Driver = require("../models/Driver");
const Team = require("../models/Team");
const { options } = require("./teamRoutes");

router.get("/", async (req, res) => {
  const drivers = await Driver.find()
    .populate({ path: "team", options: { sort: { order: 1 } } })
    .sort("championships")
    .sort("name")
    .catch((err) => res.json(err));

  res.json(drivers);
});

router.post("/", (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.json({ response: "Eksik alan girdiniz.", t: 1 });
    return false;
  }

  if (
    Object.keys(req.body).indexOf("name") < 0 ||
    Object.keys(req.body).indexOf("team") < 0 ||
    Object.keys(req.body).indexOf("psn") < 0 ||
    Object.keys(req.body).indexOf("championships") < 0
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
      return false;
    }
  });

  new Driver({
    name: req.body.name,
    team: mongoose.Types.ObjectId(req.body.team),
    psn: req.body.psn,
    championships: req.body.championships,
  })
    .save()
    .then((driver) => {
      res.json({ response: "Pilot eklendi!", driver });
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.json({ response: "Eksik alan girdiniz." });
    return false;
  }

  Driver.findByIdAndDelete(id)
    .then((driver) => {
      if (driver) res.json({ response: "Pilot silindi!", driver });
      else res.json({ response: "Pilot bulunamadı ya da daha önce silinmiş." });
    })
    .catch((err) => res.json(err));
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.json({ response: "Eksik alan girdiniz." });
    return false;
  }

  Driver.findByIdAndUpdate({ _id: id }, req.body)
    .then(async (driver) => {
      if (driver) {
        const d = await Driver.findById(id);

        res.json({ response: "Pilot güncellendi!", driver: d });
      } else res.json({ response: "Pilot bulunamadı!" });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
