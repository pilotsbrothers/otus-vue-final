<template>
  <section>
    <loading-state></loading-state>
    <div class="alerts-container">
      <alert v-for="alert in alertsList" :key="alert.id" :alert="alert" />
    </div>

    <component :is="layout">
      <router-view />
    </component>
  </section>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import {computed, onMounted} from 'vue'
import store from './store'
import LoadingState from './components/LoadingState.vue'
import Alert from './components/AlertModal.vue'

const route = useRoute()


const layout = computed(() => {
  if (route.name) {
    return route.meta.layout || 'DefaultLayout'
  }
  return null
})

const alertsList = computed(() => {
  return store.state.app.alertsList
})

onMounted(() => {
  store.dispatch('isAuth')
})

</script>
<style scoped></style>
