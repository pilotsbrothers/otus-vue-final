<template>
  <v-progress-circular
    v-if="isLoading"
    indeterminate
    color="indigo-darken-2"
    class="loader"
    :size="78"
    :width="8"
  ></v-progress-circular>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const isLoading = computed(() => {
  return !!Object.keys(store.state.app.loadings).length
})
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
