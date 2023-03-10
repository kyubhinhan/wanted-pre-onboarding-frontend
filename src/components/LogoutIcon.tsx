import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';

const LogoutIcon = () => {
  const handleLogoutButtonClick = () => {
    // access token 초기화
    localStorage.setItem('access_token', '');
    // signin page로 새로고침되면서 넘어가도록함
    window.location.replace('/signin');
  };

  // access_token이 없는 경우 로그아웃 표시를 보여주지 않음
  if (
    localStorage.getItem('access_token') === '' ||
    !localStorage.getItem('access_token')
  ) {
    return <></>;
  }

  return (
    <Container onClick={handleLogoutButtonClick}>
      <FiLogOut />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
`;

export default LogoutIcon;
