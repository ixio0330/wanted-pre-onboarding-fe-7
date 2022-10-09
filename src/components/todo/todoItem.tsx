import { useState, ChangeEvent, useRef } from 'react';

// api
import todoApi from '../../api/todo';
import { TodoDto } from "../../api/todo.dto";

// CSS
import './item.style.css';

interface TodoItemProps extends TodoDto {
  fetchTodos: Function;
}

export default function TodoItem({ id, todo, isCompleted, fetchTodos } : TodoItemProps) {
  const [isUpdate, setIsUpdate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  function updateInputValue(e: ChangeEvent<HTMLInputElement>) {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
  }
  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    try {
      await todoApi.update(id, { todo, isCompleted: e.target.checked });
      fetchTodos();
    } catch (error) {
      window.alert('할 일 수정 중 오류가 발생했습니다.');
    }
  }
  async function updateTodo() {
    if (!inputRef.current?.value) {
      window.alert('할 일을 입력해주세요.');
      return;
    }
    try {
      await todoApi.update(id, { todo: inputRef.current?.value, isCompleted });
      setIsUpdate(false);
      fetchTodos();
    } catch (error) {
      window.alert('할 일 수정 중 오류가 발생했습니다.');
    }
  }
  async function deleteTodo(id: number) {
    try {
      await todoApi.delete(id);
      fetchTodos();
    } catch (error) {
      window.alert('할 일을 삭제하던 중 오류가 발생했습니다.');
    }
  }
  const Todo = isUpdate ? <input type="text" ref={inputRef} defaultValue={todo} onChange={updateInputValue} /> : todo;
  const Controls = isUpdate ? 
  (<>
    <button onClick={() => updateTodo()} className=''>저장</button>
    <button onClick={() => setIsUpdate(false)}>취소</button>
  </>) :
  (<>
    <button disabled={isCompleted} onClick={() => setIsUpdate(true)}>수정</button>
    <button onClick={() => deleteTodo(id)}>삭제</button>
  </>);

  return (
    <li className="todo_item">
      <input className='todo_checkbox' id={`todo${id}`} type="checkbox" onChange={onChange} />
      <label className='todo' htmlFor={`todo${id}`} >
        <span className='todo_custom_checkbox'></span>
        <span className={`${isCompleted && 'todo_complete'}`}>{ Todo }</span>
      </label>
      <span className='todo_controls'>
        { Controls }
      </span>
    </li>
  );
}