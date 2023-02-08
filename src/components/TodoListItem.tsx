import React from 'react';

const TodoListItem = ({ todoItem }: TodoListItemPropType) => {
  return <div>{todoItem.todo}</div>;
};

export default TodoListItem;

interface TodoItemType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface TodoListItemPropType {
  todoItem: TodoItemType;
}

export type { TodoItemType };
