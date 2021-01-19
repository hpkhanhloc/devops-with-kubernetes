const express = require("express");
const bodyParser = require("body-parser");
const probe = require("kube-probe");
const app = express();

// Add 2 GET /api/health/liveness and /api/health/readiness
probe(app);

const db = require("./queries");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", db.getPingPong);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
