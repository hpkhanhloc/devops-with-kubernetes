const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
  host: "pingpong-postgres-svc.default",
});

const getPingPong = (request, response) => {
  pool.query("SELECT * FROM pingpong", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rowCount);
  });
};

module.exports = { getPingPong };
