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
const imagePath = path.join(directory, `${todayToString}.jpg`);
const todoPath = path.join(directory, "todos.txt");

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

const createTodoFile = async () => {
  if (!(await fileAlreadyExists(todoPath))) {
    await new Promise((res) => fs.mkdir(directory, (err) => res()));
    fs.closeSync(fs.openSync(todoPath, "w"));
  }
};

cachedImage();
createTodoFile();

app.get("/", (req, res) => {
  const randomString = createString();
  res.json(randomString);
});

app.get("/api/dailyimage", (req, res) => {
  res.sendFile(imagePath);
});

app.get("/api/todos", async (req, res) => {
  fs.readFile(todoPath, "utf8", (err, data) => {
    if (err) res(err);
    const todos = data.split(/\r?\n/);
    res.json(todos);
  });
});

app.post("/api/todos", async (req, res, next) => {
  const { body } = req;
  if (!body.todo) {
    return res.status(400).json({
      error: "todo missing",
    });
  }
  try {
    fs.appendFileSync(todoPath, body.todo);
    res.status(200).json(body.todo);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
