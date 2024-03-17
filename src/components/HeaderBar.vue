<template>
  <v-btn v-if="isLoggedIn" prepend-icon="mdi-account" @click="logout">
    Выйти
  </v-btn>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { IsLoggedIn } from "../utils/auth";

const store = useStore();
const isLoggedIn = computed(() => {
  return IsLoggedIn() || store.state.app.isLoggedIn;
});

function logout() {
  store.dispatch("Logout").catch((err) => {
    store.dispatch("ShowAlert", {
      text: err.message,
      type: "error",
    });
  });
}
</script>
