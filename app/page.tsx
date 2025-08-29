import { TodoList } from "@/app/components/TodoList";
import styles from "./page.module.css";

export default async function Page() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5"
  );
  const data = await response.json();

  const initialTodos = {};
  data.forEach((item) => {
    initialTodos[item.id] = {
      title: item.title,
      completed: item.completed
    };
  });

  return (
    <div className={styles.container}>
      <TodoList initialTodos={initialTodos} />
    </div>
  );
}