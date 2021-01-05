const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "text.txt");

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};
const randomString = createString();

app.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(`${data}: ${randomString}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
