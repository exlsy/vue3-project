<template>
  <div class="container">
    <h2>To-Do 리스트</h2>

    <input 
      class="form-control" 
      type="text" 
      v-model="searchText" 
      placeholder="Search">
    
    <hr>

    <TodoSimpleForm @add-todo="addTodo"/> 
    <div style="color:red"> {{ error }}</div>

    <div v-if="filteredTodos.length==0">
      <!-- 추가된 To-Do가 없습니다. -->
       표시할 데이터가 없습니다.
    </div>
    <!-- {{ todos }} -->
    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo" />

    <hr>
    

    <div class="row h-100 justify-content-center align-items-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-if="currentPage !== 1">
            <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage-1)">Previous</a></li>
          <li 
            class="page-item"
            :class="currentPage === page ? 'active' : ''" 
            v-for="page in numberOfPages" 
            :key="page" >
            <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{ page }}</a></li>
          <li class="page-item" v-if="numberOfPages !== currentPage">
            <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage+1)">Next</a></li>
        </ul>
      </nav>
    </div>


    <!-- {{ numberOfPages }} -->
    
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {

    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    };

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_per_page=${limit}`);
        console.log(res.data.items);
        numberOfTodos.value = res.data.items;

        console.log(res.data.data);
        todos.value = res.data.data;
      } catch(err) {
        console.log(err);
        error.value = 'Get Something went wrong!';
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      // 데이터베이스에 todo를 저장
      error.value = '';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        })
        console.log(res);
        todos.value.push(res.data);
      } catch(err) {
        console.log(err);
        error.value = 'Add Something went wrong!';
      }
      // .then( res => {
      //   console.log(res);
      //   todos.value.push(res.data);
      // })
      // .catch( err => {
      //   error.value = 'Something went wrong!';
      //   console.log(err);
      // });
    };

    const toggleTodo = async (index) => {
      console.log(index);
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/'+id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch(err) {
        console.log(err);
        error.value = 'Delete Something went wrong!';
      }
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/'+id);
        // console.log(res);
        todos.value.splice(index, 1);
      } catch(err) {
        console.log(err);
        error.value = 'Delete Something went wrong!';
      }

    };

    const searchText = ref('');

    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        })
      }
      return todos.value;
    });

    return {
      todos,
      error,
      getTodos,
      addTodo,
      todoStyle,
      toggleTodo,
      deleteTodo,
      searchText,
      filteredTodos,
      numberOfTodos,
      currentPage,
      numberOfPages,
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

