import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getAllTodos = async () => {
      await axios.get("/api/todos").then((res) => {
        setTodos(res.data);
      });
    };
    getAllTodos();
  }, []);

  const handleOnClick = async () => {
    await axios.post("/api/todos", { todo: newTodo }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setTodos([...todos, res.data]);
      }
    });
  };

  const handleInput = (event) => {
    event.preventDefault();
    setNewTodo(event.target.value);
  };

  return (
    <div>
      <img
        src={"/api/dailyimage"}
        alt="daily-image"
        width={300}
        height={300}
        style={{ display: "block" }}
      />
      <input value={newTodo} onChange={handleInput} />
      <button onClick={handleOnClick}>Create Todo</button>
      <ul>
        {todos.map((todo) => {
          return todo !== "" && <li key={todos.indexOf(todo)}>{todo}</li>;
        })}
      </ul>
      <div></div>
    </div>
  );
};

export default App;
