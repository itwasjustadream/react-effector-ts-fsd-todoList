import { useUnit } from "effector-react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/types";
import { $edit, setEdit } from "../models/store";

interface TodoItemProps {
  todo: Todo;
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
}

export default function TodoItem({ todo, completeTodo, removeTodo, updateTodo }: TodoItemProps) {
  const edit = useUnit($edit);

  const submitUpdate = (todo: { id: number; text: string }) => {
    if (edit) {
      updateTodo(todo.id, todo.text);
      setEdit(null);
    }
  };

  if (edit && edit.id === todo.id) {
    return <TodoForm edit={edit} onSubmit={(todo) => submitUpdate(todo)} />;
  }

  return (
    <div className={todo.done ? "todo-row complete" : "todo-row"}>
      <div>{todo.text}</div>
      <div className="icons">
        <MdDone onClick={() => completeTodo(todo.id)} className="complete-icon" />
        <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon" />
        <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-icon" />
      </div>
    </div>
  );
}
