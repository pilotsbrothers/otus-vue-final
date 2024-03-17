<template>
  <section class="page-content">
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="login"
              label="Логин"
              required
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="passwd"
              label="Пароль"
              required
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="2"
          >
            <v-btn type="submit" class="btn-login btn-primary">Войти</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Cookies from "js-cookie";

const router = useRouter()
const store = useStore()
const valid = ref(false)
const login = ref(null)
const passwd = ref(null)

onMounted(() => {
  store.commit('REMOVE_LOADING', 'router_pageLoad')
})

function submitForm() {
  if(valid.value === true) {
    store.dispatch('checkAuth', {login: login.value, passwd: passwd.value}).then( () => {
        if (store.state.app.isLoggedIn === true) {
          Cookies.set('LoggedIn', true)
          router.push({name: 'Dashboard'})
        }
      }
    )
  }
}

</script>

<style lang="scss" scoped>
.page-content {
  background-image: url('../assets/page-backgrd.svg');
  background-repeat: repeat;
  width: 100vw;
  height: 100vh;
}
.v-row{
  justify-content: center;
}
.btn-login{
  width: 100%;
  background-color: #00465e;
  color: #fff;
  opacity: 1;
  padding: 10px 30px;
  display: flex;
  justify-content: center;
}
</style>
