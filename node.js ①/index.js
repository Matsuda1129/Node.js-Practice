const express = require("express");
const path = require("path");

const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const { check, validationResult } = require("express-validator");
const { urlencoded } = require("express");
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

app.post("/register", urlencodedParser,[
    check("username", "ユーザー名を入力にしてください")
      .exists()
      .isLength({ min: 1}),
    check("email", "メールアドレスを入力してください")
      .isEmail()
      .normalizeEmail(),
    check("password")
      .isLength({ min: 7 })
      .withMessage("パスワードは7文字以上入力してください")
      .custom((value, { req }) => {
        if (req.body.password !== req.body.comfirmPassword) {
          throw new Error("パスワード確認と一致しません");
        }
        return true;
      }),
    // check('comformPassword', 'パスワードと一致しません')
  ],
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

app.get('/register', (req, res) => {
  res.render('register');
})
