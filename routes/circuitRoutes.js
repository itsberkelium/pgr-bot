const express = require("express");
const router = express.Router();

const Circuit = require("../models/Circuit");

router.get("/", (req, res) => {
  Circuit.find()
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
    Object.keys(req.body).indexOf("name") < 0 ||
    Object.keys(req.body).indexOf("location") < 0
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

  new Circuit({
    name: req.body.name,
    location: req.body.location,
  })
    .save()
    .then((circuit) => {
      res.json({ response: "Pist eklendi!", circuit });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
