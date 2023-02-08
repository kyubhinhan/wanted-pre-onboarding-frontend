import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('https://pre-onboarding-selection-task.shop/auth/signin', {
        email: emailValue,
        password: passwordValue,
      })
      .then(({ data }) => {
        // accessToken을 localStorage에 저장해줌
        localStorage.setItem('accessToken', data['access_token']);
        // todo 페이지로 redirect
        navigate('/todo');
      })
      .catch((err) => {
        if (err.response.data.message === 'Unauthorized') {
          window.alert('비밀번호가 일치하지 않습니다.');
        } else {
          window.alert(err.response.data.message);
        }
      });
  };

  return (
    <Container>
      <form className="signup-container" onSubmit={handleSubmit}>
        <section className="email">
          <label htmlFor="email-input">이메일</label>
          <input
            data-testid="email-input"
            id="email-input"
            value={emailValue}
            onChange={handleEmailInput}
          />
        </section>
        <section className="password">
          <label htmlFor="password-input">패스워드</label>
          <input
            data-testid="password-input"
            id="password-input"
            value={passwordValue}
            onChange={handlePasswordInput}
            type={'password'}
          />
        </section>
        <div className="signup-wrapper">
          <Link to="/signup">아이디가 없습니까? 회원 가입하기</Link>
        </div>
        <button data-testid="signin-button">로그인</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 46px);
  background-color: var(--color-grey100);
  display: flex;
  justify-content: center;
  padding-top: 46px;
  .signup-container {
    width: 500px;
    height: 290px;
    padding-top: 46px;
    background-color: var(--color-grey200);
    border-radius: 10%;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .signup-wrapper {
      margin-top: 3px;
    }
  }
  section {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    label {
      font-size: 18px;
      color: var(--color-purple200);
      font-weight: 600;
      margin-left: 20px;
      width: 150px;
    }
    input {
      padding: 0.5rem 1rem;
      width: 100%;
      margin-right: 20px;
      background-color: var(--color-purple100);
      border: 1px solid var(--color-purple100);
      border-radius: 10px;
      color: var(--color-purple200);
    }
  }
  button {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 46px;
    border: 1px solid var(--color-purple200);
    border-radius: 20px;
    background-color: var(--color-purple200);
    color: var(--color-grey100);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default SignInPage;
