import { createEvent, createStore } from "effector";
import { Todos } from "./types";

export const $todos = createStore<Todos>([]);

export const addTodo = createEvent<string>();
export const removeTodo = createEvent<number>();
export const toggleTodo = createEvent<number>();
export const editTodo = createEvent<{ id: number; newText: string }>();

export const setEdit = createEvent<{ id: number; value: string } | null>();
export const $edit = createStore<{ id: number; value: string } | null>(null).on(
  setEdit,
  (_, payload) => payload
);

export const setInput = createEvent<string>();
export const $input = createStore<string>("").on(setInput, (_, value) => value);

export const setEditInput = createEvent<string>();
export const $editInput = createStore<string>("").on(setEditInput, (_, value) => value);

const editTask = (todos: Todos, id: number, text: string): Todos =>
  todos.map((todo) =>
    todo.id === id ? { ...todo, text } : todo
  );

const toggleTask = (todos: Todos, id: number): Todos =>
  todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );

const removeTask = (todos: Todos, id: number): Todos =>
  todos.filter((todo) => todo.id !== id);

const addTask = (todos: Todos, text: string): Todos => [
  ...todos,
  {
    id: Math.max(0, ...todos.map(({ id }) => id)) + 1,
    text,
    done: false,
  },
];

$todos
  .on(addTodo, (todos, text) => addTask(todos, text))
  .on(removeTodo, (todos, id) => removeTask(todos, id))
  .on(toggleTodo, (todos, id) => toggleTask(todos, id))
  .on(editTodo, (todos, { id, newText }) => editTask(todos, id, newText));