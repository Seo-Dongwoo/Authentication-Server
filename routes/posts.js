const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// 모든 Post 가져오기
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {}
});

// 특정 Post 가져오기
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post 생성
router.post("/", async (req, res) => {
  const post = new Post({
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savePost = await post.save();
    res.json(savePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post 업데이트
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Post 삭제
router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
