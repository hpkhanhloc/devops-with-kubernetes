const fs = require("fs");
const path = require("path");

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "text.txt");

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
  fs.writeFile(filePath, `${new Date().toISOString()}`, "utf8", (err) => {
    if (err) {
      return console.log(err);
    }
  });
  setTimeout(writeFile, 5000);
};

writeFile();
