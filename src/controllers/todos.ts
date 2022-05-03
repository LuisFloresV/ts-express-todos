import { RequestHandler } from 'express';
import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
  const { text } = req.body as { text: string };
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo', createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res) => {
  res.status(200).json({ todos: TODOS });
};

export const patchTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error('Could not find a todo!');
  }
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(200).json({ updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error('Could not find a todo!');
  }

  TODOS.splice(todoIndex, 1);

  res.status(200).json({ message: 'Todo deleted succesfully' });
};
