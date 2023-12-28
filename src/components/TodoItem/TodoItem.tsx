import React from "react";
import Todo from "../../Todo";


interface PropsType {

  todo: Todo;
  handleDelete: (id: number) => void;
}

const TodoItem: React.FC<PropsType> = ({ todo, handleDelete }) => {
  return (
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
  );
};

export default TodoItem;
