"use client";
import { useEffect, useState } from "react";
import { TodoFilter } from "./TodoFilter";
import { TodoItem } from "./TodoItem";
import styles from "./TodoList.module.css";
import { todo } from "node:test";
import {Todo} from "@/app/types.ts";

interface Counts
{
  totalCount: number;
  doneCount: number;
}

export function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState<Todo>({});
  const [filter, setFilter] = useState<string>("All");
  const [counts, setCount] = useState<Counts>({
    totalCount: 0,
    doneCount : 0
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved)
    {
      const parsed = JSON.parse(saved);
      const total = Object.keys(parsed).length;
      const done = Object.values(parsed).filter(task => task.completed).length;
      setTodos(parsed);
      setCount({totalCount : total, doneCount: done});
    } 
    else {
      const total = Object.keys(initialTodos).length;
      const done = Object.values(initialTodos).filter(task => task.completed).length;
      setCount({totalCount : total, doneCount: done});
      setTodos(initialTodos);
    }
    setIsLoaded(true);
  }, [initialTodos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const total = Object.keys(todos).length;
    const done = Object.values(todos).filter(task => task.completed).length;
    setCount({totalCount : total, doneCount: done});
  }, [todos, isLoaded]);

  if(!isLoaded)
    return null;

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
        <h1>Список задач</h1>
        Выполнено: {counts.doneCount} из {counts.totalCount}
      </div>
      
      {counts.totalCount === 0 && (
        <div className={styles.emptyState}>Задач нет</div>
      )}
      
      {Object.keys(filteredTodos).length === 0 && counts.totalCount > 0 && (
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