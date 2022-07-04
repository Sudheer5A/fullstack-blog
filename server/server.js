const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const addRoute = require("./routes/addRoute");
const getRoute = require("./routes/getRoute");
const removeRoute = require("./routes/removeRoute");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_CONNECT_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected")
);

app.use("/api/blog", addRoute);
app.use("/api/blog", getRoute);
app.use("/api/blog", removeRoute);

app.listen(5000);
