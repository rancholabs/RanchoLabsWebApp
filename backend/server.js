const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./routers");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const config = require("./config");
const db = require("./db");
const { PORT } = config;
db.connect();

// app.use(busboy());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(busboyBodyParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", router);

app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("Welcome to Rancho Labs");
  }
});

app.use(cors());

app.listen(PORT, () => {
  console.log(`Rancho Labs API is running on port no ${PORT}`);
});
