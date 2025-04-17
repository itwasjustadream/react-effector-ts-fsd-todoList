import { useUnit } from "effector-react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { $todos, addTodo, toggleTodo, removeTodo, editTodo } from "../models/store";

const TodoList = () => {
  const [todos] = useUnit([$todos]);

  const handleAddTodo = (todo: { id: number; text: string }) => {
    if (!todo.text || /^\s*$/.test(todo.text)) return;
    addTodo(todo.text);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={handleAddTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          completeTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodo={(id, newText) => editTodo({ id, newText })}
        />
      ))}
    </div>
  );
};

export default TodoList;