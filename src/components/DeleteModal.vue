<template>
  <!--
  v-on: => @
  v-bind: => :
  v-slot: => #
   -->
  <Modal>
    <template #title>
      Todo 삭제하기
    </template>
    <template #body>
      - Todo를 삭제하시겠습니까?
    </template>
    <template #footer>
      <button 
        type="button" 
        class="btn btn-secondary" 
        @click="onClose"
      >
        취소
      </button>
      <button 
        type="button" 
        class="btn btn-danger"
        @click="onDelete"
      >
        확인
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Modal,
  },
  setup(props, { emit }) {
    const onClose = () => {
      emit('close');
    };
    const onDelete = () => {
      emit('delete');
    };

    return {
      onClose,
      onDelete,
    }
  }
}
</script>

<style>

</style>