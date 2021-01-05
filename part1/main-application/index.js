const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};

const printOutStringWithTimestamp = (randomString) => {
  console.log(`${new Date().toISOString()}: ${randomString}`);

  setTimeout(printOutStringWithTimestamp, 5000, randomString);
};

const randomString = createString();
printOutStringWithTimestamp(randomString);

app.get("/", (req, res) => {
  res.json(`${new Date().toISOString()}: ${randomString}`);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
