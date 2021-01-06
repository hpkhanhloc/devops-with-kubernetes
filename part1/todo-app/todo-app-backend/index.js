const express = require("express");
const moment = require("moment");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static("build"));

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};

const todayToString = moment().format("DD-MM-YYYY");

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, `${todayToString}.jpg`);

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const cachedImage = async () => {
  if (!(await fileAlreadyExists())) {
    await new Promise((res) => fs.mkdir(directory, (err) => res()));
    const response = await axios.get(
      `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      { responseType: "stream" }
    );
    response.data.pipe(fs.createWriteStream(filePath));
  }
};

cachedImage();

app.get("/", (req, res) => {
  const randomString = createString();
  res.json(randomString);
});

app.get("/api/dailyimage", (req, res) => {
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
