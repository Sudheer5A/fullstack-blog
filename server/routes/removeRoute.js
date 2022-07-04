const router = require("express").Router();
const Blog = require("../model/schema");

router.post("/remove", async (req, res) => {
  try {
    const blog = await Blog.deleteOne({ id: req.body.id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
