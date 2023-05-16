const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB");
});
app.post("/add_mahasiswa", async (req, res) => {
  const { name, npm, jurusan } = req.body;
  const user = new User({ name, npm, jurusan });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.listen(3000, () => console.log("Server started at port: 3000"));
