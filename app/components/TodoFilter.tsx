"use client";
import { useState } from "react";
import styles from "./TodoFilter.module.css";

export function TodoFilter({ filter, addItem, setFilter }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      addItem(newTask);
      setNewTask("");
    }
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <button 
          className={`${styles.filterButton} ${filter === "All" ? styles.active : ""}`}
          onClick={() => setFilter("All")}
        >
          Все
        </button>
        <button 
          className={`${styles.filterButton} ${filter === "Active" ? styles.active : ""}`}
          onClick={() => setFilter("Active")}
        >
          Активные
        </button>
        <button 
          className={`${styles.filterButton} ${filter === "Completed" ? styles.active : ""}`}
          onClick={() => setFilter("Completed")}
        >
          Завершенные
        </button>
      </div>
      
      <div className={styles.addForm}>
        <input
          className={styles.taskInput}
          placeholder="Новая задача..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.addButton} onClick={handleAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}