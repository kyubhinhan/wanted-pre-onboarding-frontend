import React from 'react';
import { Reset } from 'styled-reset';
import styled, { createGlobalStyle } from 'styled-components';
import { Outlet } from 'react-router-dom';

const LayoutPage = () => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Container>
        <header>My Todo List</header>
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
    justify-content: center;
    color: var(--color-grey100);
  }
`;

export default LayoutPage;
