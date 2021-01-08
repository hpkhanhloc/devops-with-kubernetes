import React from "react";

const App = () => {
  const TODOS = [
    { id: 1, content: "Todo 1" },
    { id: 2, content: "Todo 2" },
  ];

  return (
    <div>
      <img
        src={"/api/dailyimage"}
        alt="daily-image"
        width={300}
        height={300}
        style={{ display: "block" }}
      />
      <input />
      <button>Create Todo</button>
      <ul>
        {TODOS.map((todo) => {
          return <li key={todo.id}>{todo.content}</li>;
        })}
      </ul>
      <div></div>
    </div>
  );
};

export default App;
