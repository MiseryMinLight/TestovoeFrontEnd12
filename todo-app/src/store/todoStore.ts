import { defineStore } from 'pinia';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as Todo[],
  }),

  actions: {
    loadTodos() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    },
    
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },

    addTodo(text: string) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    },

    toggleTodo(id: number) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
      }
    },

    editTodo(id: number, newText: string) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.text = newText;
        this.saveTodos();
      }
    },

    deleteTodo(id: number) {
      this.todos = this.todos.filter(t => t.id !== id);
      this.saveTodos();
    },
  },
});
