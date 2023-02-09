import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import customAxios from '../utils/customAxios';

const TodoListItem = ({ todoItem, setTodoList }: TodoListItemPropType) => {
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

  // 삭제 버튼이 클릭되었을 때, 삭제를 해줌
  const handleDeleteButtonClick = async () => {
    try {
      // 서버에 삭제 요청을 보냄
      await customAxios.delete(`todos/${todoItem.id}`);
      // 목록에서 삭제해줌
      setTodoList((pre) => {
        return pre.filter((todoElement) => {
          if (todoElement.id === todoItem.id) {
            return false;
          } else {
            return true;
          }
        });
      });
    } catch (error) {
      window.alert(error);
    }
  };

  // 수정 버튼이 클릭되었을 때, 수정 모드로 바꾸어줌
  const handleFixButtonClick = () => {
    setFixValue(originValue);
    setFixMode(true);
  };

  // 수정 내용이 변할 때 바꾸어줌
  const handleFixValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixValue(e.target.value);
  };

  // 취소 버튼 클릭
  const handleCancleButtonClick = () => {
    // value 초기화
    setFixValue(originValue);
    // 모드 변경
    setFixMode(false);
  };

  // 제출 버튼 클릭
  const handleSubmitButtonClick = async () => {
    try {
      const { data } = await customAxios.put(`todos/${todoItem.id}`, {
        todo: fixValue,
        isCompleted: isCompleted,
      });
      setOriginValue(data.todo);
      setFixMode(false);
    } catch (error) {
      window.alert(error);
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
          <button data-testid="modify-button" onClick={handleFixButtonClick}>
            수정
          </button>
          <button
            data-testid="delete-button"
            className="delete"
            onClick={handleDeleteButtonClick}
          >
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
            onChange={handleFixValueChange}
          />
          <button data-testid="submit-button" onClick={handleSubmitButtonClick}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={handleCancleButtonClick}>
            취소
          </button>
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
      font-size: 12px;
      padding-left: 0.5rem;
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
  setTodoList: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
}

export type { TodoItemType };
