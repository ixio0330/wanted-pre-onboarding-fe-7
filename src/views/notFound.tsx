import { Link } from 'react-router-dom';

// CSS
import './notfound.style.css';

export default function NotFound() {
  return (
    <div className='notfound_view'>
      <h1>404</h1>
      <h3>존재하지 않는 페이지입니다.</h3>
      <Link to='/'>홈으로 가기</Link>
    </div>
  );
}