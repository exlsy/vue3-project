<template>
  <div 
    class="alert toast-box"
    :class="`alert-${type}`"
    role="alert"  
  >
  <!-- 간단한 알림창 with Toast -->
  {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'success',
    }
  }
}
</script>

<style>
  .toast-box {
    position: fixed;
    top: 10px;
    right: 10px;
  }
</style>