const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  image: {
    data: String,
    contentType: String,
  },

  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
