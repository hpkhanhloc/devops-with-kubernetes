const { Pool } = require("pg");
const connectionString = `postgres://postgres:${process.env.POSTGRES_PASSWORD}@postgres-svc:5432/postgres`;
const pool = new Pool({ connectionString: connectionString });

const NATS = require("nats");
const nc = NATS.connect(process.env.NATS_URL, { json: true });

const getTodos = async (request, response) => {
  console.log("Get all todos...");
  await pool
    .query("SELECT * FROM todos")
    .then((result) => response.status(200).json(result.rows))
    .catch((e) => console.error(e.stack));
};

const postTodo = async (request, response) => {
  const { todo } = request.body;
  console.log(`Inserting new todo: ${todo}`);
  if (todo.length > 140) {
    response.status(422).json("Maximum leng is 140");
  } else {
    await pool
      .query(`INSERT INTO todos (to_do) VALUES ($1) RETURNING *`, [`${todo}`])
      .then((result) => response.status(201).json(result.rows[0]))
      .catch((e) => console.error(e.stack));
  }
};

const putTodo = async (request, response) => {
  const id = parseInt(request.params.id);
  console.log(`Update todo ${id}`);
  await pool
    .query("UPDATE todos SET status = $1 WHERE ID = $2", ["Done", id])
    .then((result) => {
      nc.publish("updateTodo", {
        user: "bot",
        message: "A todo updated",
      });
      response.status(200).send(`Updated todo id: ${id}`);
    })
    .catch((e) => console.error(e.stack));
};

module.exports = { getTodos, postTodo, putTodo };
