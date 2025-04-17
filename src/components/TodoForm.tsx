import { useState, useEffect, useRef } from "react";

type TodoFormProps = {
  onSubmit: (todo: { id: number; text: string }) => void;
  edit?: { id: number; value: string };
};

const TodoForm = ({ onSubmit, edit }: TodoFormProps) => {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: edit ? edit.id : Math.floor(Math.random() * 10000), text: input });
    setInput("");
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