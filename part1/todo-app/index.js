const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const createString = () => {
  return Math.random().toString(36).substr(2, 10);
};

app.get("/", (req, res) => {
  const randomString = createString();
  res.json(randomString);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
