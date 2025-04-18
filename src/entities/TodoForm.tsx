import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import { $input, setInput, $editInput, setEditInput } from "../shared/store";

type TodoFormProps = {
  onSubmit: (todo: { id: number; text: string }) => void;
  edit?: { id: number; value: string };
};

const TodoForm = ({ onSubmit, edit }: TodoFormProps) => {
  const [input, updateInput] = useUnit(edit ? [$editInput, setEditInput] : [$input, setInput]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) {
      updateInput(edit.value);
    } else {
      updateInput("");
    }
    inputRef.current?.focus();
  }, [edit, updateInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: edit ? edit.id : Math.floor(Math.random() * 10000), text: input });
    updateInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={edit ? "Update your item" : "Add a todo"}
        value={input}
        name="text"
        className={edit ? "todo-input edit" : "todo-input"}
        onChange={handleChange}
        ref={inputRef}
      />
      <button className={edit ? "todo-button edit" : "todo-button"}>
        {edit ? "Update todo" : "Add todo"}
      </button>
    </form>
  );
};

export default TodoForm;