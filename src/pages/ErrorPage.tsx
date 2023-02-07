import React from 'react';
import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      에러가 발생했습니다
      <p>
        <i>{(error as any).statusText || (error as any).message}</i>
      </p>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
