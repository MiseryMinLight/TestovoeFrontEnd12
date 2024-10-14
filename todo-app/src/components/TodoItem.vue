<template>
    <div class="todo-item" :class="{ completed: todo.completed }">
      <input type="checkbox" v-model="todo.completed" @change="toggleComplete(todo.id)" />
      <span @dblclick="startEditing">{{ todo.text }}</span>
      <button @click="deleteTask(todo.id)">Удалить</button>
      
      <input v-if="isEditing" v-model="newText" @keyup.enter="editTask" @blur="editTask"/>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useTodoStore } from '../store/todoStore';
  
  export default defineComponent({
    props: {
      todo: {
        type: Object as () => { id: number; text: string; completed: boolean },
        required: true,
      },
    },
    setup(props) {
      const isEditing = ref(false);
      const newText = ref(props.todo.text);
      const todoStore = useTodoStore();
  
      const toggleComplete = (id: number) => {
        todoStore.toggleTodo(id);
      };
  
      const deleteTask = (id: number) => {
        todoStore.deleteTodo(id);
      };
  
      const startEditing = () => {
        isEditing.value = true;
      };
  
      const editTask = () => {
        if (newText.value.trim()) {
          todoStore.editTodo(props.todo.id, newText.value);
        }
        isEditing.value = false;
      };
  
      return { toggleComplete, deleteTask, startEditing, editTask, newText, isEditing };
    },
  });
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  