import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import useInput from '../hooks/useInput';

// Component
import AuthInput from '../components/auth/authInput';

// api
import authApi from '../api/auth';

// utils
import { setToken } from '../utils/localStorage';

// CSS
import './auth.style.css';

import inputRules from '../rules/auth.rule';

export default function LoginView() {
  const navigate = useNavigate();
  const { input: userEmail, updateInput: setUserEmail } = useInput();
  const { input: userPassword, updateInput: setUserPassword} = useInput();
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    register();
  }
  async function register() {
    if (!isValid()) {
      window.alert('이메일과 비밀번호를 확인해주세요.');
      return;
    }

    try {
      const { access_token } = await authApi.register({ email: userEmail, password: userPassword });
      setToken(access_token);
      navigate('/todo', { replace : true });
    } catch (error) {
      window.alert('회원가입에 실패했습니다.');
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
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <AuthInput 
          label='이메일'
          id='userEmail'
          name='userEmail'
          value={userEmail}
          onChange={setUserEmail}
          rules={[inputRules.email]}
          onEnter={register}
        />
        <AuthInput 
          label='비밀번호'
          type='password'
          id='userPassword'
          name='userPassword'
          value={userPassword}
          onChange={setUserPassword}
          rules={[inputRules.password]}
          onEnter={register}
        />
        <p>
          <span>계정이 이미 있으신가요?</span> 
          <Link className='link_sing' to='/'>로그인하기</Link>
        </p>
        <button type='submit' disabled={!isValid()}>회원가입</button>
      </form>
    </div>
  );
}