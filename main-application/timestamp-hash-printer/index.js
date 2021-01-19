const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const probe = require("kube-probe");
const app = express();

probe(app, { readinessUrl: "http://pingpong-svc:80" });

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
  await axios.get("http://pingpong-svc:80").then((res) => {
    console.log(res.data);
    pingpong = res.data[0].count;
  });
  res.json(
    `${process.env.message} ${text}: ${randomString}, Ping/pong: ${pingpong}`
  );
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
