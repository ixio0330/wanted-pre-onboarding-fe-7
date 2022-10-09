import { useNavigate } from 'react-router-dom';

// utils
import { removeToken } from '../../utils/localStorage';

// CSS
import './header.style.css';

export default function TodoHeader() {
  const navigate = useNavigate();

  function logout() {
    removeToken();
    navigate('/', { replace: true });
  }
  return (
    <header>
      <h1>TODO</h1>
      <span onClick={logout}>로그아웃</span>
    </header>
  );
}