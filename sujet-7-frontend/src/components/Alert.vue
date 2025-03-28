<template>
  <div v-if="message" class="alert" :class="{'alert-success': !isError, 'alert-error': isError}">
    {{ message }}
    <button @click="$emit('close')" class="alert-close">
      <i class="bi bi-x"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
  isError: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style scoped>
.alert {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

.alert-success {
  background-color: #4CAF50;
  color: white;
}

.alert-error {
  background-color: #f44336;
  color: white;
}

.alert-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
