const { Pool } = require("pg");
const connectionString = `postgres://postgres:${process.env.POSTGRES_PASSWORD}@postgres-svc:5432/postgres`;
const pool = new Pool({ connectionString: connectionString });

const getTodos = async (request, response) => {
  await pool
    .query("SELECT * FROM todos")
    .then((result) => response.status(200).json(result.rows))
    .catch((e) => console.error(e.stack));
};

const postTodo = async (request, response) => {
  const { todo } = request.body;
  await pool
    .query(`INSERT INTO todos (to_do) VALUES ($1) RETURNING *`, [`${todo}`])
    .then((result) => response.status(201).json(result.rows[0]))
    .catch((e) => console.error(e.stack));
};

module.exports = { getTodos, postTodo };
