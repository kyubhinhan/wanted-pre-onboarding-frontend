import React, { useEffect } from 'react';
import { Reset } from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';
import { Outlet } from 'react-router-dom';
import LogoutIcon from '../components/LogoutIcon';
import { useNavigate } from 'react-router-dom';

const LayoutPage = () => {
  const navigate = useNavigate();

  // 처음에 메인 페이지로 왔을 때,
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken || accessToken === '') {
      // access token이 비어 있으면 signin으로 보냄
      navigate('/signin');
    } else {
      // access token이 있으면 todo로 보냄
      navigate('/todo');
    }
  }, []);

  return (
    <>
      <Reset />
      <GlobalStyle />
      <Container>
        <header>
          <h1>My Todo List</h1>
          <LogoutIcon />
        </header>
        <Outlet />
      </Container>
    </>
  );
};

// 전역적으로 적용할 global style 정의
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    font-size: 16px;
  }

  :root{
    --color-purple100:#C3ACD0;
    --color-purple200:#674188;
    --color-grey100:#FFFBF5;
    --color-grey200:#F7EFE5;
    --color-red:#db4455;
    --font-size-large: 20px;
  }
`;

const Container = styled.div`
  min-width: 500px;
  header {
    font-size: var(--font-size-large);
    font-weight: 600;
    padding: 0.5rem 1rem;
    background-color: var(--color-purple200);
    display: flex;
    color: var(--color-grey100);
    align-items: center;
    h1 {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

export default LayoutPage;
