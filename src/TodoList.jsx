import React, { useState, useEffect } from "react";
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
      setTodos(localTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-items">
      {todos.map((todo, index) => (
        <Todo key={index} index={index} todo={todo} removeTodo={removeTodo} />
      ))}
    </div>
    </div>
  );
};

const Todo = ({ todo, index, removeTodo }) => {
  const handleClick = () => {
    removeTodo(index);
  };

  return (
    <div>
      {todo.text} <button onClick={handleClick}>x</button>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add Todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoList;
