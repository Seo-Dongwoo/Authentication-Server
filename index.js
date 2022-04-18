const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// 경로 가져오기
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

// 데이터베이스 연결
mongoose.connect(process.env.DB, { useNewUrlParser: true }, () =>
  console.log("데이터베이스 연결 성공")
);

// 미들웨어
app.use(express.json());
app.use(cors());

// 경로 미들웨어
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

// 3000번 포트로 서버 연결
app.listen(3000, () => console.log("서버 연결 확인"));
