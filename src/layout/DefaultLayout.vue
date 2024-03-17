<template>
  <v-layout class="rounded rounded-md">
    <menu-bar></menu-bar>
    <v-app-bar class="app-bar">
      <template #prepend>
        <v-app-bar-nav-icon color="white" @click="toggle"></v-app-bar-nav-icon>
      </template>
      <header-bar />
    </v-app-bar>

    <v-main class="page-content" style="min-height: 300px">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script setup>
import MenuBar from '../components/MenuBar.vue'
import { useStore } from 'vuex'
import HeaderBar from '../components/HeaderBar.vue'
const store = useStore()

function toggle() {
  store.state.app.drawer = !store.state.app.drawer
}
</script>

<style scoped lang="scss">
.app-bar {
  background-color: #00465e !important;
  color: white !important;
}

.page-content {
  background-image: url('../assets/page-backgrd.svg');
  min-height: 100vh !important;
  background-size: cover;
}
</style>
