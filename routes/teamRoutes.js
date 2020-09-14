const express = require("express");
const router = express.Router();

const Team = require("../models/Team");

router.get("/", (req, res) => {
  Team.find()
    .sort("order")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

router.post("/", async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.json({ response: "Eksik alan girdiniz.", t: 1 });
    return false;
  }

  if (
    Object.keys(req.body).indexOf("title") < 0 ||
    Object.keys(req.body).indexOf("championships") < 0 ||
    Object.keys(req.body).indexOf("color") < 0
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

  const order = req.body.order
    ? req.body.order
    : parseInt(await Team.count()) + 1;

  new Team({
    title: req.body.title,
    championships: req.body.championships,
    color: req.body.color,
    order,
  })
    .save()
    .then((team) => {
      res.json({ response: "Takım eklendi!", team });
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.json({ response: "Eksik alan girdiniz." });
    return false;
  }

  Team.findByIdAndDelete(id)
    .then((team) => {
      if (team) res.json({ response: "Takım silindi!", team });
      else res.json({ response: "Takım bulunamadı ya da daha önce silinmiş." });
    })
    .catch((err) => res.json(err));
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.json({ response: "Eksik alan girdiniz." });
    return false;
  }

  Team.findByIdAndUpdate({ _id: id }, req.body)
    .then(async (team) => {
      if (team) {
        const d = await Team.findById(id);

        res.json({ response: "Takım güncellendi!", team: d });
      } else res.json({ response: "Takım bulunamadı!" });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
