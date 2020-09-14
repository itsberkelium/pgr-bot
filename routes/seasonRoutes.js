const express = require("express");
const router = express.Router();

const Season = require("../models/Season");

router.get("/", (req, res) => {
  Season.find()
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

  if (Object.keys(req.body).indexOf("name") < 0) {
    res.json({
      response: "Eksik alan girdiniz.",
      t: 2,
    });
    return false;
  }

  if (req.body.name === "") {
    res.json({
      response: "Eksik alan girdiniz.",
      t: 3,
      k: key,
      v: req.body[key],
    });
    return true;
  }

  new Season({
    name: req.body.name,
  })
    .save()
    .then((season) => {
      res.json({ response: "Sezon eklendi!", season });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
