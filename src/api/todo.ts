import http from ".";
import { TodoDto } from "./todo.dto";

const todoApi = {
  async getAll(): Promise<TodoDto[]> {
    return await http.get('todos');
  },
  async create(todo: string): Promise<TodoDto> {
    return await http.post('todos', {
      todo
    });
  },
  async update(todoId: number, updateTodo: { todo: string; isCompleted: boolean }): Promise<TodoDto> {
    return await http.put(`todos/${todoId}`, { ...updateTodo });
  },
  async delete(todoId: number) {
    return await http.delete(`todos/${todoId}`);
  }
};

export default todoApi;