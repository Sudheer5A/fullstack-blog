const router = require("express").Router();
const Blog = require("../model/schema");
const { v4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");
const tinify = require("tinify");

tinify.key = process.env.TINIFY_KEY;

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

router.post("/add", upload.single("image"), async (req, res) => {
  //Compressing images using TinyPNG API
  const source = await tinify.fromFile("uploads/" + req.file.filename);
  let destination = await source.toFile(
    "optimized/" + "optimized_" + req.file.filename
  );

  //Create new blog object
  const blog = new Blog({
    id: v4(),
    name: req.body.name,
    message: req.body.message,
    email: req.body.email,
    image: {
      data: fs
        .readFileSync("optimized/" + "optimized_" + req.file.filename)
        .toString("base64"),
      contentType: "image/*",
    },
    timestamp: new Date(),
  });

  try {
    //Save the blog to database
    const saveBlog = await blog.save();
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = router;
