<template>
  <transition name="alert-fade">
    <v-alert v-if="alert" colored-border elevation="2" :type="alert.type">
      <v-row align="center">
        <v-col class="grow">
          {{ alert.text }}
        </v-col>

        <v-col v-if="alert.isPermanent" class="shrink">
          <v-btn @click="closeAlert"> Закрыть </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import store from "../store";

const props = defineProps({
  alert: {
    type: Object,
    default: null,
  },
});
const alertTimeToLive = ref(3500);

watch(
  props.alert,
  (val) => {
    if (val && !props.alert.isPermanent) {
      return clearAlert();
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

function clearAlert() {
  setTimeout(() => {
    store.dispatch("ClearAlert", props.alert.id);
  }, alertTimeToLive.value);
}

function closeAlert() {
  store.dispatch("ClearAlert", props.alert.id);
}
</script>

<style lang="scss" scoped>
.v-alert {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
}

.alert-fade-enter-active {
  animation: alert-fade-in 0.3s;
}

.alert-fade-leave-active {
  animation: alert-fade-out 0.3s;
}

@keyframes alert-fade-in {
  0% {
    transform: translate3d(-50%, -30px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(-50%, 0, 0);
    opacity: 1;
  }
}

@keyframes alert-fade-out {
  0% {
    transform: translate3d(-50%, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(-50%, -30px, 0);
    opacity: 0;
  }
}
</style>
