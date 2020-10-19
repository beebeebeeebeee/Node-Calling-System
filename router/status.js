const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

router.get("/", (req, res) => {
  const adapter = new FileSync("db.json");
  const db = low(adapter);

  pending = [];
  ready = [];
  db.get("pending")
    .value()
    .forEach((element) => {
      pending.push(element.id);
    });
  db.get("ready")
    .value()
    .forEach((element) => {
      ready.push(element.id);
    });
  res.send({
    pending: pending,
    ready: ready,
  });
});

module.exports = router;
