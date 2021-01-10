const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const textFilePath = path.join(directory, "text.txt");

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};
const randomString = createString();

app.get("/", async (req, res) => {
  let pingpong = "";
  let text = "";
  fs.readFile(textFilePath, "utf8", (err, data) => {
    if (err) {
      res.json(err);
    }
    text = data;
  });
  await axios
    .get("http://pingpong-svc:80")
    .then((res) => (pingpong = res.data));
  res.json(`${process.env.message} ${text}: ${randomString}, ${pingpong}`);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
