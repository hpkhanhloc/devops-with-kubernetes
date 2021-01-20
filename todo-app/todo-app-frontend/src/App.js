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
      console.log(res.data);
      if (res.status === 201) {
        setTodos([...todos, res.data]);
      }
    });
  };

  const handleInput = (event) => {
    event.preventDefault();
    setNewTodo(event.target.value);
  };

  const handleUpdate = async (id) => {
    await axios.put(`/api/todos/${id}`).then((res) => {
      if (res.status === 200) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, status: "Done" } : todo
          )
        );
      }
    });
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
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo?.status !== null ? (
              `${todo.to_do} - ${todo.status}`
            ) : (
              <div style={{ display: "inline" }}>
                {todo.to_do}
                <button onClick={() => handleUpdate(todo.id)}>Update!</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
