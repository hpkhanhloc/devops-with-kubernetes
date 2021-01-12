const Pool = require("pg").Pool;
const connectionString = `postgres://postgres:${process.env.POSTGRES_PASSWORD}@pp-postgres-svc:5432/postgres`;
const pool = new Pool({ connectionString: connectionString });

const getPingPong = async (request, response) => {
  console.log(connectionString);
  await pool
    .query("SELECT count(pingpong) FROM pingpong")
    .then((result) => response.status(200).json(result.rows))
    .catch((e) => console.error(e.stack));
};

module.exports = { getPingPong };
