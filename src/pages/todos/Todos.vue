<template>
  <!-- <div>Todos -------- 페이지</div> -->
  <!-- <router-view/> -->
  <div>
    <div class="d-flex justify-content-between mb-2">
      <h2>To-Do 리스트</h2>
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
      >
        Todo 생성하기
      </button>
    </div>

    <input
      class="form-control" 
      type="text" 
      v-model="searchText" 
      placeholder="Search"
      @keyup.enter="searchTodo"
      >

    <hr>

    <div v-if="todos.length==0">
      <!-- 추가된 To-Do가 없습니다. -->
       표시할 데이터가 없습니다.
    </div>
    <!-- {{ todos }} -->
    <TodoList 
      :todos="todos" 
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

  <Toast 
    v-if="showToast" 
    :message="toastMessage"
    :type="toastAlertType"
  />

</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  components: {
    TodoList,
    Toast,
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const { showToast, toastMessage, toastAlertType, triggerToast, } = useToast();

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
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        // numberOfTodos.value = res.data.items;
        numberOfTodos.value = res.headers['x-total-count'];

        console.log(res.data);
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Get Something went wrong!';
        triggerToast('Get Something went wrong!', 'danger');
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      // 데이터베이스에 todo를 저장
      error.value = '';
      try {
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        })
        // console.log(res);
        getTodos(1);
        // todos.value.push(res.data);
      } catch(err) {
        console.log(err);
        error.value = 'Add Something went wrong!';
        triggerToast('Add Something went wrong!', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      console.log(index, checked);
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/'+id, {
          // completed: !todos.value[index].completed
          completed: checked
        });
        // todos.value[index].completed = !todos.value[index].completed;
        todos.value[index].completed = checked;
      } catch(err) {
        console.log(err);
        error.value = 'Toggle Something went wrong!';
        triggerToast('Toggle Something went wrong!', 'danger');
      }
    };

    const deleteTodo = async (id) => {
      error.value = '';
      // const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/'+id);
        // console.log(res);
        // todos.value.splice(index, 1);
        getTodos(1);
      } catch(err) {
        console.log(err);
        error.value = 'Delete Something went wrong!';
        triggerToast('Delete Something went wrong!', 'danger');
      }

    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      });
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, (curr, prev) => {
      console.log(curr, ' | ', prev);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        getTodos(1);
      }, 1500);
    });

    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     })
    //   }
    //   return todos.value;
    // });

    return {
      todos,
      error,
      getTodos,
      addTodo,
      todoStyle,
      toggleTodo,
      deleteTodo,
      searchText,
      searchTodo,
      // filteredTodos,
      numberOfTodos,
      currentPage,
      numberOfPages,
      showToast,
      toastMessage,
      toastAlertType,
      // toastTimeout,
      triggerToast,
      moveToCreatePage,
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

