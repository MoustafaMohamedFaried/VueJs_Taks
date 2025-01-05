<template>
  <NavbarView />
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss"></style>

<script>
import NavbarView from '@/views/components/NavbarView.vue';

export default {
  components: { // Add the missing colon here
    NavbarView,
  },
};
</script>
