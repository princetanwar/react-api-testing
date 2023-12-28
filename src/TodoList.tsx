// src/TodoList.tsx
import React, { useState, useEffect } from "react";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const responseJson = await response.json();
        setTodos(responseJson);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const filteredTodos = React.useMemo(
    () =>
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [todos,searchTerm]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ listStyle: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid black",
                width: "400px",
                height: "150px",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <div>{todo.id}</div>
              <p>
                {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
              </p>
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
