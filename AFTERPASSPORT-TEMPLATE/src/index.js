const express = require("express");
const engine = require("ejs-mate");
const app = express();
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
require("./database/database");

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Settings
const port = process.env.PORT || 3001;
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

//Start server;
app.get("/", (_, res) => {
  return res.render("home");
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
