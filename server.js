const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = require("./helper/db")();

const driverRoutes = require("./routes/driverRoutes");
const teamRoutes = require("./routes/teamRoutes");
const circuitRoutes = require("./routes/circuitRoutes");
const seasonRoutes = require("./routes/seasonRoutes");
const raceResultRoutes = require("./routes/raceResultRoutes");

app.use("/driver", jsonParser, driverRoutes);
app.use("/team", jsonParser, teamRoutes);
app.use("/circuit", jsonParser, circuitRoutes);
app.use("/season", jsonParser, seasonRoutes);
app.use("/race-result", jsonParser, raceResultRoutes);

app.get("/", (req, res) => console.log("Hello world!"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
