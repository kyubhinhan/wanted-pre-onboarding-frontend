import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const SignInPage = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    if ((e.target.value as string).includes('@')) {
      setEmailCheck('valid');
    }
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    if ((e.target.value as string).length >= 8) {
      setPasswordCheck('valid');
    }
  };

  const checkEmailValid = () => {
    if (emailValue.includes('@')) {
      setEmailCheck('valid');
    } else {
      setEmailCheck('invalid');
    }
  };

  const checkPasswordValid = () => {
    if (passwordValue.length >= 8) {
      setPasswordCheck('valid');
    } else {
      setPasswordCheck('invalid');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('https://pre-onboarding-selection-task.shop/auth/signin', {
        email: emailValue,
        password: passwordValue,
      })
      .then(({ data }) => {
        localStorage.setItem('access_token', data['access_token']);
        navigate('/todo');
      })
      .catch((err) => {
        if (err.response.data.message === 'Unauthorized') {
          window.alert('password가 일치하지 않습니다.');
        } else {
          window.alert(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    if (emailValue.includes('@') && passwordValue.length >= 8) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [emailValue, passwordValue]);

  // access token이 있을 경우 todo로 redirect 시켜줌
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo');
    }
  }, []);

  return (
    <Container>
      <form className="signin-container" onSubmit={handleSubmit}>
        <section className="email">
          <label htmlFor="email-input">이메일</label>
          <input
            data-testid="email-input"
            id="email-input"
            value={emailValue}
            onChange={handleEmailInput}
            onBlur={checkEmailValid}
          />
          {emailCheck === 'invalid' && (
            <p className="warnning">@ 포함한 이메일 형태로 작성해주세요</p>
          )}
        </section>
        <section className="password">
          <label htmlFor="password-input">패스워드</label>
          <input
            data-testid="password-input"
            id="password-input"
            value={passwordValue}
            onChange={handlePasswordInput}
            onBlur={checkPasswordValid}
            type={'password'}
          />
          {passwordCheck === 'invalid' && (
            <p className="warnning">8자리 이상의 비밀번호를 사용해주세요</p>
          )}
        </section>
        <div className="signup-wrapper">
          <Link to={'/signup'}>회원 가입</Link>
        </div>
        <button
          data-testid="signin-button"
          data-disabled={buttonDisabled}
          disabled={buttonDisabled}
        >
          로그인
        </button>
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
  .signin-container {
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
      position: relative;
      top: 5px;
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
    .warnning {
      position: absolute;
      bottom: 0;
      left: 130px;
      font-size: 14px;
      color: #db4455;
    }
  }
  button {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 46px;
    border: 1px solid var(--color-purple100);
    border-radius: 20px;
    background-color: var(--color-purple100);
    color: var(--color-grey100);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &[data-disabled='false'] {
      background-color: var(--color-purple200);
      border: 1px solid var(--color-purple200);
    }
  }
`;

export default SignInPage;
