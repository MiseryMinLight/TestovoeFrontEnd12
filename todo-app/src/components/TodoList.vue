<template>
    <div>
      <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Новая задача" />
      <ul>
        <li v-for="todo in todoStore.todos" :key="todo.id">
          <TodoItem :todo="todo" />
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useTodoStore } from '../store/todoStore';
  import TodoItem from './TodoItem.vue';
  
  export default defineComponent({
    components: { TodoItem },
    setup() {
      const newTodo = ref('');
      const todoStore = useTodoStore();
  
      onMounted(() => {
        todoStore.loadTodos();
      });
  
      const addNewTodo = () => {
        if (newTodo.value.trim()) {
          todoStore.addTodo(newTodo.value);
          newTodo.value = '';
        }
      };
  
      return { newTodo, addNewTodo, todoStore };
    },
  });
  </script>
  