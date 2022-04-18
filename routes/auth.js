const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");

// 회원가입
router.post("/register", async (req, res) => {
  // 유효성 검사해서 에러 체크
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 이미 유저가 데이터베이스에 있는지를 체크
  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send("email이 이미 존재합니다.");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // 새로운 유저 만들기
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  // 유효성 검사해서 오류 검사
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 이미 이메일 존재하는지 여부 체크
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email을 찾을 수 없습니다.");

  // password가 옳을 경우
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("유효하지 않은 password");

  // 토큰 생성 및 할당
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
  res.header("auth-token", token).send(token);

  res.send("로그인 성공!");
});

module.exports = router;
