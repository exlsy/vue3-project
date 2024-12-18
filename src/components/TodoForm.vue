<template>
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
          <input 
            v-model="todo.subject" 
            type="text" 
            class="form-control"
          >
          <div 
            v-if="subjectError" 
            class="text-red">
            {{ subjectError }}
          </div>
        </div>
      </div>
      <div v-if="editing" class="col-6">
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
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" id="" cols="30" rows="10">

          </textarea>
        </div>
      </div>
    </div>
    <button 
      type="submit" 
      class="btn "
      :class="todoUpdated ? 'btn-primary' : 'btn-secondary'"
      :disabled="!todoUpdated"
    >
      {{ editing ? '저장' : '생성' }}
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
  props: {
    editing: Boolean,
    default: false,
  },
  setup(props) {

    const route = useRoute();
    const router = useRouter();
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });
    const subjectError = ref('');
    const orgTodo = ref(null);
    const loading = ref(false);
    const todoId = route.params.id;

    const { showToast, toastMessage, toastAlertType, triggerToast, } = useToast();

    const getTodo = async () => {
      loading.value = true;
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        console.log(res.data);
        todo.value = { ...res.data };
        orgTodo.value = { ...res.data };
        loading.value = false;

      } catch(err) {
        loading.value = false;
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
      subjectError.value = '';
      if(!todo.value.subject) {
        subjectError.value = 'Todo의 제목(subject)이 필요합니다.!';
        return;
      }

      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        }
        if (props.editing) {
          data.id = todoId;
          res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
          orgTodo.value = {...res.data};
        } else {
          res = await axios.post(`http://localhost:3000/todos`, data);
          todo.value.subject = '';
          todo.value.body = '';
        }

        // console.log(res.data);
        // todo.value = res.data;

        orgTodo.value = {...res.data};
        triggerToast( props.editing ? '저장 성공!!' : '생성 성공!!', 'success');

      } catch(err) {
        console.log(err);
        // error.value = 'Get Something went wrong!';
        triggerToast('Save Something went wrong!', 'danger');
      }
    };

    if(props.editing) {
      getTodo();
    }

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
      subjectError,
    };

  }
}
</script>

<style scoped>
  .text-red {
    color: red
  }
</style>