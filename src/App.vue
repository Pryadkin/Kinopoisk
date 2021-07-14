<template>
  <div class="app">
    <a-menu class="mainMenu" :default-selected-keys="['1']" :default-open-keys="['sub1']" :mode="mode" :theme="theme">
      <a-menu-item key="1" @click="$router.push({ name: 'Profile' })">
        <a-icon type="home" />
        My movies
      </a-menu-item>
      <a-menu-item key="2" @click="$router.push({ name: 'Search' })">
        <a-icon type="search" />
        Search
      </a-menu-item>
    </a-menu>
    <router-view />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'home',
    data() {
      return {
        mode: 'inline',
        theme: 'dark'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app {
    position: relative;
    display: grid;
    grid-template-columns: 0.25fr 1fr;
  }
  .mainMenu {
    width: 256px;
    height: 100vh;
  }
</style>
