<template>
  <h1>Todo 페이지</h1>
  <div v-if="loading">
    Loading..
  </div>
  <form v-else
    @submit.prevent="onSave"
  >
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
              type="button"
              class="btn" 
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            > {{ todo.completed ? 'Completed' : 'Incompleted' }}
            </button>
            <!-- <button class="btn btn-danger">Incompleted</button> -->
          </div>
        </div>
      </div>
    </div>
    <button 
      type="submit" 
      class="btn "
      :class="todoUpdated ? 'btn-primary' : 'btn-secondary'"
      :disabled="!todoUpdated"
    >
      저장
    </button>
    <button class="btn btn-dark ml-2"
      @click="movoToDodoListPage"
    >
      취소
    </button>
  </form>
  <Toast 
    v-if="showToast" 
    :message="toastMessage"
    :type="toastAlertType"
  />

  <!-- <div id='kossie' >coder</div> -->
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast,
  },
  setup() {
    // onBeforeMount(() => {
    //   console.log('beforeMount', document.querySelector('#kossie'));
    // });

    // onMounted(() => {
    //   console.log('mounted', document.querySelector('#kossie'));
    // });

    // onBeforeUpdate(() => {
    //   console.log('before update');
    // });

    // onUpdated(() => {
    //   console.log('updated');
    // });

    // onBeforeUnmount(() => {
    //   console.log('before unmount');
    // });

    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const orgTodo = ref(null);
    const loading = ref(true);
    const todoId = route.params.id;

    const { showToast, toastMessage, toastAlertType, triggerToast, } = useToast();

    const getTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        console.log(res.data);
        todo.value = { ...res.data };
        orgTodo.value = { ...res.data };
        loading.value = false;

      } catch(err) {
        console.log(err);
        triggerToast('Get Something went wrong!', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, orgTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const movoToDodoListPage = () => {
      router.push({
        name: 'Todos',
      });
    }

    const onSave = async () => {

      try {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          id: todoId,
          subject: todo.value.subject,
          completed: todo.value.completed,
        });

        console.log(res.data);
        // todo.value = res.data;

        orgTodo.value = {...res.data};
        triggerToast('저장 성공!!', 'success');

      } catch(err) {
        console.log(err);
        // error.value = 'Get Something went wrong!';
        triggerToast('Save Something went wrong!', 'danger');
      }
    };

    getTodo();

    // console.log(route.params.id);

    return {
      todo,
      loading,
      toggleTodoStatus,
      movoToDodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast,
    };

  }
}
</script>

<style>
/* .unchanged {
  background-color: gray;
 } */
</style>
