const { title } = require("process");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  require("dotenv").config();
  res.send({ title: process.env.title });
});

module.exports = router;
