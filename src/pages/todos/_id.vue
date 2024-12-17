<template>
  <h1>Todo 페이지</h1>
  <div v-if="loading">
    Loading..
  </div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <!-- <input v-model="todo.completed" type="text" class="form-control"> -->
          <div>
            <button 
              class="btn" 
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
            > {{ todo.completed ? 'Completed' : 'Incompleted' }}
            </button>
            <!-- <button class="btn btn-danger">Incompleted</button> -->
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary">
      저장
    </button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const route = useRoute();
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos/'+route.params.id);

        console.log(res.data);
        todo.value = res.data;
        loading.value = false;

      } catch(err) {
        console.log(err);
        // error.value = 'Get Something went wrong!';
      }
    };

    getTodo();

    // console.log(route.params.id);

    return {
      todo,
      loading,
      
    };

  }
}
</script>

<style>

</style>
