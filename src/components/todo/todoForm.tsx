import { useRef, ChangeEvent, FormEvent } from 'react';

// api
import todoApi from '../../api/todo';

// CSS
import './form.style.css';

export default function TodoForm({ fetchTodos }: { fetchTodos: Function }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function updateInputValue(e: ChangeEvent<HTMLInputElement>) {
    if (inputRef.current) {
      inputRef.current.value = e.target.value;
    }
  }

  function resetInputValue() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }
  
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputRef.current?.value) {
      window.alert('할 일을 입력해주세요.');
      return;
    }
    createTodo(inputRef.current?.value);
    resetInputValue();
  }

  async function createTodo(todo: string) {
    try {
      await todoApi.create(todo);
      fetchTodos();
    } catch (error) {
      window.alert('할 일 생성 중 오류가 발생했습니다.');
    }
  }

  return (
    <form className='todo_form' onSubmit={onSubmit}>
      <input type="text" ref={inputRef} onChange={updateInputValue} />
      <button>+</button>
    </form>
  );
}