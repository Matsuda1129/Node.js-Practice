const { check } = require("express-validator");

exports.loginValidator = [
  check("username", "ユーザー名を入力にしてください")
    .exists()
    .isLength({ min: 1 }),
  check("email", "メールアドレスを入力してください").isEmail().normalizeEmail(),
  check("password")
    .isLength({ min: 7 })
    .withMessage("パスワードは7文字以上入力してください")
    .custom((value, { req }) => {
      if (req.body.password !== req.body.comfirmPassword) {
        throw new Error("パスワード確認と一致しません");
      }
      return true;
    }),
];