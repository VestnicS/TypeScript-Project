"use client";
import styles from "./TodoItem.module.css";

export function TodoItem({ title, completed, toggle, deleteItem }) {
  return (
    <div className={styles.taskItem}>
      <input
        type="checkbox"
        className={styles.taskCheckbox}
        checked={completed}
        onChange={toggle}
      />
      <span className={`${styles.taskText} ${completed ? styles.completed : ""}`}>
        {title}
      </span>
      <button className={styles.deleteButton} onClick={deleteItem}>
        Удалить
      </button>
    </div>
  );
}