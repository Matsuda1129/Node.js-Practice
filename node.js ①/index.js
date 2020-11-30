const express = require("express");
const path = require("path");

const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const { validationResult } = require("express-validator");
const { urlencoded } = require("express");
const validator = require('./validator')
app.set("view engine", "ejs");
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public"));

app.listen(4000, () => {
  console.log(" App listening on port 4000");
});

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/register", urlencodedParser,validator.loginValidator,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("register", {
        alert,
      });
    } else {
      res.render("home", {
        username: req.body.username,
      });
      res.redirect('/home')
    }
  }
);
