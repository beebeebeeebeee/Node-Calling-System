const express = require("express");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const port = 3000;

app.use("/",express.static("main"));
app.use("/public",express.static("public"));

const dom = require("./router/dom");
app.use("/api/dom", dom);
const status = require("./router/status");
app.use("/api/status", status);

io.on("connection", (socket) => {
  console.log("a user connected");
});

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
db.defaults({ pending: [], ready: [] }).write();

app.get("/api/add/:id", (req, res) => {
  db.get("pending").push({id: req.params.id}).write();
  res.status(200).send({ msg: "added" });
  io.emit('update');
});

app.get("/api/ready/:id", (req, res) => {
  if (db.get("pending").find({id: req.params.id}).value() != null) {
    db.get("pending").remove({id: req.params.id}).write();
    db.get("ready").push({id: req.params.id}).write();
    res.status(200).send({ msg: "moved" });
    io.emit('update');
  } else {
    res.status(201).send({ msg: "not found" });
  }
});

app.get("/api/delete/:id", (req, res) => {
    if (db.get("ready").find({id: req.params.id}).value() != null) {
        db.get("ready").remove({id: req.params.id}).write();
        res.status(200).send({ msg: "deleted" });
        io.emit('update');
      } else {
        res.status(201).send({ msg: "not found" });
      }
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
