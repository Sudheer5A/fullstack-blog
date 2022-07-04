const router = require("express").Router();
const Blog = require("../model/schema");

router.get("/get", async (req, res) => {
  try {
    const blog = await Blog.find();
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
