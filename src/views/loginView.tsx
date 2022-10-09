import { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import useInput from '../hooks/useInput';

// Component
import AuthInput from '../components/auth/authInput';

// api
import authApi from '../api/auth';

// utils
import { setToken, getToken } from '../utils/localStorage';

// CSS
import './auth.style.css';

import inputRules from '../rules/auth.rule';

export default function LoginView() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (getToken()) {
      navigate('/todo', { replace: true });
    }
  }, []);
  
  const { input: userEmail, updateInput: setUserEmail } = useInput();
  const { input: userPassword, updateInput: setUserPassword} = useInput();
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login();
  }
  async function login() {
    if (!isValid()) {
      window.alert('이메일과 비밀번호를 확인해주세요.');
      return;
    }

    try {
      const { access_token } = await authApi.login({ email: userEmail, password: userPassword });
      setToken(access_token);
      navigate('/todo', { replace : true });
    } catch (error) {
      window.alert('로그인에 실패했습니다.');
    }
  }
  function isValid() {
    if (!userEmail ||
      !userPassword || 
      inputRules.email(userEmail) ||
      inputRules.password(userPassword) 
    ) {
      return false;
    }
    return true;
  }

  return (
    <div className='auth_view'>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <AuthInput 
          label='이메일'
          id='userEmail'
          name='userEmail'
          value={userEmail}
          onChange={setUserEmail}
          rules={[inputRules.email]}
          onEnter={login}
        />
        <AuthInput 
          label='비밀번호'
          type='password'
          id='userPassword'
          name='userPassword'
          value={userPassword}
          onChange={setUserPassword}
          rules={[inputRules.password]}
          onEnter={login}
        />
        <p>
          <span>계정이 없으신가요?</span> 
          <Link className='link_sing' to='/singup'>회원가입하기</Link>
        </p>
        <button type='submit' disabled={!isValid()}>로그인</button>
      </form>
    </div>
  );
}