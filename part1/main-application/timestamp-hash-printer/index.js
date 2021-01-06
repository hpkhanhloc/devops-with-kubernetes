const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const textFilePath = path.join(directory, "text.txt");
const pingpongFilePath = path.join(directory, "pingpong.txt");

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};
const randomString = createString();

app.get("/", (req, res) => {
  fs.readFile(textFilePath, "utf8", (err, text) => {
    if (err) {
      res.json(err);
    }
    fs.readFile(pingpongFilePath, "utf8", (err, counter) => {
      if (err) {
        res.json(err);
      }
      res.json(`${text}: ${randomString}, Ping / Pong: ${counter}`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
