<template>
  <v-navigation-drawer v-model="store.state.app.drawer" class="menu-box">
    <div class="logo-box">
      <div class="logo-text">Сервис уведомлений</div>
    </div>
    <ul>
      <li
        v-for="item in availableMenuItems"
        :key="item.path"
        class="menu-item"
        :class="item.name === route.name ? 'active' : ''"
      >
        <router-link :to="item.path">
          <img
            alt
            width="30"
            height="30"
            :src="'/assets/icons/' + item.meta.icon + '.svg'"
          />
          <span>{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { setSidebarMenuAvailableRoutesList } from "../utils/router";
const store = useStore();
const availableMenuItems = computed(() => {
  return store.state.app.sidebar.availableRoutesList;
});

const route = useRoute();

onMounted(() => {
  if (!availableMenuItems.value.length) {
    setSidebarMenuAvailableRoutesList();
  }
});
</script>

<style scoped lang="scss">
.menu-box {
  background-color: #00465e;

  .menu-item {
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 5px;
    font-size: 16px;
    color: white;
    cursor: pointer;
    a {
      display: flex;
      position: relative;
      color: white;
      text-decoration: none;
      width: 100%;
      align-items: center;
    }
    & img {
      padding-right: 10px;
      color: white;
    }

    &:hover {
      background-color: #005677;
    }

    &.active {
      background-color: #004e6d;
    }
  }

  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
  }

  .logo {
    width: auto;
    height: 100%;
    text-align: center;
  }

  .logo-text {
    color: white;
    padding: 5px;
    font-weight: bold;
  }
}
</style>
