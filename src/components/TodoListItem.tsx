import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import customAxios from '../utils/customAxios';

const TodoListItem = ({ todoItem }: TodoListItemPropType) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [originValue, setOriginValue] = useState('');
  const [fixValue, setFixValue] = useState('');
  const [fixMode, setFixMode] = useState(false);

  // 넘어온 값으로 초기화
  useEffect(() => {
    setIsCompleted(todoItem.isCompleted);
    setOriginValue(todoItem.todo);
  }, []);

  // 완료 버튼이 클릭되었을 때, 처리를 해줌
  const handleCompleteButtonClick = async () => {
    try {
      customAxios.put(`todos/${todoItem.id}`, {
        todo: originValue,
        isCompleted: !isCompleted,
      });
      setIsCompleted((pre) => !pre);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCompleteButtonClick}
        className="complete-checkbox"
      />
      {!fixMode && (
        <div className="content-wrapper">
          <span className="content-value" data-completed={isCompleted}>
            {originValue}
          </span>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button" className="delete">
            삭제
          </button>
        </div>
      )}
      {fixMode && (
        <div className="content-wrapper">
          <input
            data-testid="modify-input"
            className="content-value"
            value={fixValue}
          />
          <button data-testid="submit-button">제출</button>
          <button data-testid="cancel-button">취소</button>
        </div>
      )}
    </Container>
  );
};

export default TodoListItem;

const Container = styled.li`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-purple200);
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  .content-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 3px;
    .content-value {
      width: 100%;
      line-height: 120%;
      color: var(--color-purple200);
      &[data-completed='true'] {
        text-decoration: line-through;
      }
    }
    button {
      padding: 0.3rem;
      min-width: 50px;
      font-size: 12px;
      cursor: pointer;
      background-color: var(--color-purple100);
      border: 1px solid var(--color-purple100);
      border-radius: 5px;
      color: var(--color-grey100);
    }
    button:hover {
      background-color: var(--color-purple200);
    }
    .delete {
      color: var(--color-red);
    }
  }
`;

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
