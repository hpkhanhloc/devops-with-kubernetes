const express = require("express");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 5001;
const NATS = require("nats");
const nc = NATS.connect(process.env.NATS_URL, { json: true });

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
  nc.subscribe("updateTodo", async (msg) => {
    console.log(`message from nats: ${msg}`);
    await axios
      .post("https://httpbin.org/post", JSON.stringify(msg))
      .then((res) => console.log(`response from generic url ${res.data}`))
      .catch((error) => console.error(error.stack));
  });
});
