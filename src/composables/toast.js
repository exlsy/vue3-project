import { ref, onUnmounted } from 'vue';

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastAlertType = ref('');
  const timeout = ref(null);

  const triggerToast = (message, type) => {
    showToast.value = true;
    toastMessage.value = message;
    toastAlertType.value = type;

    timeout.value = setTimeout(()=> {
      console.log('triggerToast setTimeout');
      toastMessage.value = '';
      toastAlertType.value = '';
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    console.log('unmounted');
    clearTimeout(timeout.value);
  });

  return {
    showToast,
    toastMessage,
    toastAlertType,
    // timeout,
    triggerToast,
  }

};



