import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginView from './views/loginView';
import RegisterView from './views/registerView';
import TodoView from './views/todoView';
import NotFound from './views/notFound';
import './app.style.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginView />} />
          <Route path='/singup' element={<RegisterView />} />
          <Route path='/todo' element={<TodoView />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
