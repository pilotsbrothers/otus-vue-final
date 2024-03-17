<template>
  <v-form
    v-if="!Object.keys(store.state.app.loadings).length"
    ref="form"
    v-model="valid"
    @submit.prevent="submitForm"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-label>Текст</v-label>
          <v-textarea
            v-model="sms.text"
            :rules="[rules.required]"
            name="text"
            :disabled="!canEdit"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" md="4">
          <v-label>Организация</v-label>
          <v-autocomplete
            v-model="selectedOrganizations"
            label=""
            chips
            multiple
            clearable
            :items="organizationList"
            item-title="node.shortName"
            item-value="node._id"
            :disabled="!canEdit"
          ></v-autocomplete>
        </v-col>
        <v-col cols="4" md="4">
          <v-label>Округ</v-label>
          <v-autocomplete
            v-model="selectedDistricts"
            label=""
            chips
            multiple
            clearable
            :items="districtList"
            item-title="node.name"
            item-value="node._id"
            :disabled="!canEdit"
          ></v-autocomplete>
        </v-col>
        <v-col cols="4" md="4">
          <v-label>Роль пользователя</v-label>
          <v-autocomplete
            v-model="selectedPersonRoles"
            label=""
            chips
            multiple
            clearable
            :items="personRoleList"
            item-title="node.name"
            item-value="node._id"
            :disabled="!canEdit"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <template v-if="props.id">
        <v-row>
          <v-col cols="12" md="6">
            <v-label>Идентификатор рассылки</v-label>
            <v-text-field v-model="sms.id" :disabled="true"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Дата добавления</v-label>
            <v-text-field v-model="sms.created_at" :disabled="true"></v-text-field>
          </v-col>
        </v-row>
      </template>
      <v-row v-if="!canEdit">
        <v-col cols="12" md="12">
          <label>Список рассылки:</label>
          <v-card class="email-list">
            <v-list>
              <v-list-item
                v-for='item in sms.list'
                :title='item.surname + " " + item.name + " " + item.patronymic'
                :subtitle='item.phone'
              ></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" v-if="canEdit">
          <v-btn type="submit" rounded="0" class="btn-submit">Применить</v-btn>
          <router-link :to="{ name: 'ListSms' }">
            <v-btn-inversed rounded="0">Отменить</v-btn-inversed>
          </router-link>
        </v-col>
        <v-col v-else cols="12" md="12">
          <v-btn-inversed rounded="0" @click="router.push({name: 'ListSms'})">Назад</v-btn-inversed>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import gql from "graphql-tag";
import {provideApolloClient, useQuery} from "@vue/apollo-composable";

const props = defineProps({
  id: {
    type: Number,
    default: null
  }
})
const router = useRouter()
const form = ref(null)
const valid = ref(false)
const rules = ref({
  required: (v) =>
    typeof v !== 'undefined' && v !== '' && v != null ? true : 'Поле обязательно для заполнения'
})

const store = useStore()
const sms = computed(() => {
  return store.state.sms.item
})

const canEdit = computed(() => {
  return props.id === null
})
const selectedDistricts = computed({
  get() {
    return store.state.sms.item.district_list
  },
  set(newValue) {
    store.state.sms.item.district_list = newValue
  }
})
const selectedOrganizations = computed({
  get() {
    return store.state.sms.item.org_list
  },
  set(newValue) {
    store.state.sms.item.org_list = newValue
  }
})
const selectedPersonRoles = computed({
  get() {
    return store.state.sms.item.pers_role_list
  },
  set(newValue) {
    store.state.sms.item.pers_role_list = newValue
  }
})
const DISTRICT_QUERY = gql`
        query {
          districts{
            edges {
              node {
                _id,
                name
              }
            }
          }
        }`
const query = provideApolloClient(app.apolloClient)(() => useQuery(DISTRICT_QUERY))
const districtList = computed(() => query.result.value?.districts.edges)

const ORG_QUERY = gql`
        query {
          organizations{
            edges {
              node {
                _id,
                shortName,
                fullName,
                district{
                  _id,
                  name
                }
              }
            }
          }
        }`

const queryOrg = provideApolloClient(app.apolloClient)(() => useQuery(ORG_QUERY))
const organizationList = computed(() => queryOrg.result.value?.organizations.edges)

const ROLES_QUERY = gql`
        query {
          personRoles{
            edges {
              node {
                _id,
                name
              }
            }
          }
        }`

const queryRoles = provideApolloClient(app.apolloClient)(() => useQuery(ROLES_QUERY))
const personRoleList = computed(() => queryRoles.result.value?.personRoles.edges)


onMounted(() => {
  if (props.id != null) {
    store.commit('SET_LOADING', 'smsForm')
    store.dispatch('getSmsItem', props.id).then(() => {
      store.commit('REMOVE_LOADING', 'smsForm')
    })
  } else {
    store.commit('SET_ITEM', {})
  }
})

function submitForm() {
  if (valid.value === true) {
    store.state.sms.item.org_list = selectedOrganizations
    store.state.sms.item.district_list = selectedDistricts
    store.state.sms.item.pers_role_list = selectedPersonRoles
    store.dispatch('submitSmsForm')
  }
}
</script>

<style scoped>
.icon-img img {
  max-width: 150px;
}
.btn-submit{
  margin-right: 15px;
}
.email-list{
  margin-top: 15px;
}
</style>
