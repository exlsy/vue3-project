<template>
    <form @submit.prevent="onSubmit" >
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input class="form-control" type="text" v-model="todo" placeholder="새로운 to-do를 입력하세요.!">
        </div>
        <div>
          <button class="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </div>
      <div v-show="hasError" style="color: red">
        이 필드는 공백일수 없습니다!
      </div>
    </form>
</template>


<script>
import { ref } from 'vue';
    
    export default {
      setup(props, context) {
        const todo = ref('');
        const hasError = ref(false);

        const onSubmit = () => {
          // e.preventDefault();
          // console.log(todo.value);
          if (todo.value === '') {
              hasError.value = true;
          } else {
            
            context.emit('add-todo', {
              id: Date.now(),
              subject: todo.value,
              completed: false,
            });
            hasError.value = false;
            todo.value = '';
          }
        }

        return {
          todo,
          hasError,
          onSubmit,
        }
      }
    }
</script>



<style >

</style>

