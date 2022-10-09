import { TodoDto } from "../../api/todo.dto";

// Component
import TodoItem from "./todoItem";

// CSS
import './list.style.css';

export default function TodoList({ todos, fetchTodos }: { todos: TodoDto[], fetchTodos: Function }) {
  return (
    <>
      {
        !todos.length ? 
        <div className="todo_no_data">할 일을 추가해보세요!</div> :
        <ul className="todo_list">
          {
            todos.map((todo) => <TodoItem key={todo.id} {...todo} fetchTodos={fetchTodos} />)
          }
        </ul>
      }
    </>
  );
}