<script setup lang="ts">
import { RouterView } from 'vue-router'
import CartSidebar from '@/components/common/CartSidebar.vue'
</script>

<template>
  <div id="app">
    <RouterView />
    <CartSidebar />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  background: var(--background-dark);
  color: var(--text-primary);
}
</style> 