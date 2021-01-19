const express = require("express");
const moment = require("moment");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./queries");
const probe = require("kube-probe");

const app = express();
probe(app);
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("build"));

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};

const todayToString = moment().format("DD-MM-YYYY");

const directory = path.join("/", "usr", "src", "app", "files");
const imagePath = path.join(directory, `${todayToString}.jpg`);

const fileAlreadyExists = async (file) =>
  new Promise((res) => {
    fs.stat(file, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const cachedImage = async () => {
  if (!(await fileAlreadyExists(imagePath))) {
    await new Promise((res) => fs.mkdir(directory, (err) => res()));
    const response = await axios.get(
      `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      { responseType: "stream" }
    );
    response.data.pipe(fs.createWriteStream(imagePath));
  }
};

cachedImage();

app.get("/", (req, res) => {
  const randomString = createString();
  res.json(randomString);
});

app.get("/api/dailyimage", (req, res) => {
  res.sendFile(imagePath);
});

app.get("/api/todos", db.getTodos);

app.post("/api/todos", db.postTodo);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
