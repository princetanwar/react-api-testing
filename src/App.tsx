// src/App.tsx
import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;
