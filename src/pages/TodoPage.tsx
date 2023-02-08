import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import customAxios from '../utils/customAxios';
import TodoListItem from '../components/TodoListItem';
import type { TodoItemType } from '../components/TodoListItem';

const TodoPage = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [todoInputValue, setTodoInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 처음 마운트 될 때 서버에 조회해서 데이터를 채워줌
  // 만약 에러가 났고 그 이유가 token 값이 없거나 잘못된 거이면
  // signin page로 redirect 시켜줌
  useEffect(() => {
    customAxios
      .get('todos')
      .then(({ data }) => {
        setTodoList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        // 토근 값이 이상할 때 토큰을 초기화하고 signin으로 redirect해줌
        if (err.message === 'Request failed with status code 401') {
          localStorage.setItem('access_token', '');
          navigate('/signin');
        }
      });
  }, []);

  const handleTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInputValue(e.target.value);
  };

  // todo 목록을 추가해줌
  const handleTodoInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 값이 있는 경우에만 추가해주도록 함
    if (todoInputValue) {
      try {
        // 데이터를 받아서 List에 넣어줌
        const { data } = await customAxios.post('todos', {
          todo: todoInputValue,
        });
        setTodoList((pre) => [...pre, data]);
        // 다시 input 창 비워줌
        setTodoInputValue('');
      } catch (err) {
        // 에러가 난 경우 accessToken을 지워주어서 다시 로그인하도록 함
        console.log(err);
        localStorage.setItem('access_token', '');
      }
    }
  };

  // loading 중일 때(서버로부터 데이터를 받고 있을 때)
  if (isLoading) {
    return <LoadingContainer>loading...</LoadingContainer>;
  }

  return (
    <Container>
      <form className="todo-input" onSubmit={handleTodoInputSubmit}>
        <input
          data-testid="new-todo-input"
          value={todoInputValue}
          onChange={handleTodoInputChange}
        />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      {todoList.map((todoItem) => {
        return <TodoListItem key={todoItem.id} todoItem={todoItem} />;
      })}
    </Container>
  );
};

export default TodoPage;

const Container = styled.div`
  background-color: var(--color-grey100);
  height: calc(100vh - 46px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 23px;
  .todo-input {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 400px;
    input {
      padding: 0.5rem 0.5rem;
      width: 100%;
    }
    button {
      padding: 0.5rem 0.5rem;
      min-width: 50px;
      background-color: var(--color-purple200);
      border: 1px solid var(--color-purple200);
      border-radius: 5px;
      color: var(--color-grey100);
      cursor: pointer;
    }
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: calc(100vh - 46px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
