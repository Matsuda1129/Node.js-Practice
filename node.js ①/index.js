const express = require('express')
const path = require('path')

const ejs = require("ejs");
const app = new express();
app.set("view engine", "ejs");
app.use(express.static("public"));


app.listen(4000, () => {
  console.log(" App listening on port 4000");
});

app.get('/', (req, res) => {
  res.render('login');
})

app.get('/register', (req, res) => {
  res.render('register');
})