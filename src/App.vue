<template>
  <div class="container">
    <h2>To-Do 리스트</h2>
    <TodoSimpleForm @add-todo="addTodo"/> 
  
    <div v-if="todos.length==0">
      추가된 To-Do가 없습니다.
    </div>
    <!-- {{ todos }} -->
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id" >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <!-- <label class="form-check-label" :style="todo.completed ?  todoStyle : {}"> -->
          <label class="form-check-label" :class="{ todo: todo.completed }">
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleForm
  },
  setup() {

    const todos = ref([]);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    };

    const addTodo = (todo) => {
      console.log(todo);
      todos.value.push(todo);
    }

    const deleteTodo = (index) => {
      console.log('delete todo');
      todos.value.splice(index, 1);
    };

    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
    };
  }
}
</script>

<style>
/* .name {
  color: red;
} */
 .todo {
  color: gray;
  text-decoration: line-through;
 }
</style>

