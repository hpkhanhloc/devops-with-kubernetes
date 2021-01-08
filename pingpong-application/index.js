const express = require("express");
const fs = require("fs");
const path = require("path");

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "pingpong.txt");
const app = express();

const PORT = process.env.PORT || 3003;

let counter = 0;

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const writeFile = async () => {
  if (!(await fileAlreadyExists())) {
    await new Promise((res) => fs.mkdir(directory, (err) => res()));
  }
  fs.writeFile(filePath, `${counter}`, "utf8", (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

app.get("/", (req, res) => {
  counter += 1;
  writeFile();
  res.json(`pong ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
