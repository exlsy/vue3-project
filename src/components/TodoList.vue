<template>
  <!-- <div 
    class="card mt-2" 
    v-for="(todo, index) in todos" 
    :key="todo.id" 
  > -->
  <List
    :items="todos"
  >
    <template #default="{ item, index }" >
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input 
            class="ml-2 mr-3"
            type="checkbox" 
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
            >
            <!-- v-model="todo.completed" -->
          <span :class="{ todo: item.completed }">
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm" 
            @click.stop="openModal(item.id, item.subject)"
          >
            <!-- @click.stop="deleteTodo(index)" -->
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>
  <teleport to="#modal" >
    <DeleteModal 
      v-if="showModal"
      :subject="todoDeleteSubject"
      @close="closeModal"
      @delete="deleteTodo"
    >
      <!-- <template v-slot:title>
        Todo 삭제하기
      </template>
      <template v-slot:body>
        - Todo를 삭제하시겠습니까?
      </template>
      <template v-slot:footer>
      </template> -->
    </DeleteModal>
  </teleport>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DeleteModal from '@/components/DeleteModal.vue';
import List from '@/components/List.vue';


export default {
  components: {
    DeleteModal,
    List,
  },
  // props: ['todos'],
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  emits: ['toggle-todo', 'delete-todo'],
  setup(props, {emit}) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    const todoDeleteSubject = ref('');

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const openModal = (id, subject) => {
      showModal.value = true;
      todoDeleteId.value = id;
      todoDeleteSubject.value = subject;
    };

    const closeModal = () => {
      showModal.value = false;
      todoDeleteId.value = null;
      todoDeleteSubject.value = '';
    };

    const deleteTodo = () => {
      // emit('delete-todo', index);
      emit('delete-todo', todoDeleteId.value);

      showModal.value = false;
      todoDeleteId.value = null;
      todoDeleteSubject.value = '';
    };

    const moveToPage = (todoId) => {
      console.log('moveTo', todoId);
      // router.push('/todos/'+todoId);
      router.push({
        name: 'Todo',
        params: {
          id: todoId,
        }
      });
    };

    return {
      router,
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
      todoDeleteId,
      todoDeleteSubject,
    }
  }
}
</script>

<style>

</style>