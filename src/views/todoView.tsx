import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import TodoHeader from '../components/todo/todoHeader';
import TodoForm from '../components/todo/todoForm';
import TodoList from '../components/todo/todoList';

// api
import todoApi from '../api/todo';
import { TodoDto } from '../api/todo.dto';

// CSS
import './todo.style.css';
import { getToken } from '../utils/localStorage';

export default function TodoView() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoDto[]>([]);
  
  useEffect(() => {
    if (!getToken()) {
      navigate('/', { replace: true });
      return;
    }
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (error) {
      window.alert('할 일 목록을 가져오던 중 오류가 발생했습니다.');
    }
  }

  return (
    <div className='todo_view'>
      <TodoHeader />
      <div className="todo_content">
        <TodoForm fetchTodos={fetchTodos} />
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      </div>
    </div>
  )
}