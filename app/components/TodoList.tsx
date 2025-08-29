"use client";
import { useEffect, useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState({});
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved)
       {
      setTodos(JSON.parse(saved));
    } 
    else {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let doneCount = 0;
  let totalCount = 0;
  
  for (const id in todos) {
    totalCount++;
    if (todos[id].completed) {
      doneCount++;
    }
  }

  const filteredTodos = {};
  for (const id in todos) {
    const task = todos[id];
    if (filter === "All" || 
        (filter === "Completed" && task.completed) ||
        (filter === "Active" && !task.completed)) {
      filteredTodos[id] = task;
    }
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.counter}>
        Выполнено: {doneCount} из {totalCount}
      </div>
      
      {totalCount === 0 && (
        <div className={styles.emptyState}>Задач нет</div>
      )}
      
      {Object.keys(filteredTodos).length === 0 && totalCount > 0 && (
        <div className={styles.emptyState}>Нет задач по выбранному фильтру</div>
      )}
      
      {Object.entries(filteredTodos).map(([id, task]) => (
        <TodoItem
          key={id}
          title={task.title}
          completed={task.completed}
          toggle={() => {
            setTodos(prev => ({
              ...prev,
              [id]: { ...task, completed: !task.completed }
            }));
          }}
          deleteItem={() => {
            const newTodos = { ...todos };
            delete newTodos[id];
            setTodos(newTodos);
          }}
        />
      ))}
      
      <TodoFilter
        filter={filter}
        setFilter={setFilter}
        addItem={(title) => {
          const newId = Date.now().toString();
          setTodos(prev => ({
            ...prev,
            [newId]: { title, completed: false }
          }));
        }}
      />
    </div>
  );
}