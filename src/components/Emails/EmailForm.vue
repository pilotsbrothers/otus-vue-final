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
          <v-label>Тема письма</v-label>
          <v-text-field
            v-model="emails.subject"
            :rules="[rules.required]"
            type="text"
            maxlength="50"
            :disabled="!canEdit"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-label>Текст письма</v-label>
          <v-textarea
            v-model="emails.text"
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
            <v-text-field v-model="emails.id" :disabled="true"></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Дата добавления</v-label>
            <v-text-field
              v-model="emails.created_at"
              :disabled="true"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <v-row v-if="!canEdit">
        <v-col cols="12" md="12">
          <label>Список рассылки:</label>
          <v-card class="email-list">
            <v-list>
              <v-list-item
                v-for="item in emails.list"
                :title="item.surname + ' ' + item.name + ' ' + item.patronymic"
                :subtitle="item.email"
              ></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" v-if="canEdit">
          <v-btn type="submit" rounded="0" class="btn-submit">Применить</v-btn>
          <router-link :to="{ name: 'ListEmails' }">
            <v-btn-inversed rounded="0">Отменить</v-btn-inversed>
          </router-link>
        </v-col>
        <v-col v-else cols="12" md="12">
          <v-btn-inversed
            rounded="0"
            @click="router.push({ name: 'ListEmails' })"
            >Назад</v-btn-inversed
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { districtList, organizationList, personRoleList } from "../../utils/filters.js"

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
});
const router = useRouter();
const form = ref(null);
const valid = ref(false);
const rules = ref({
  required: (v) =>
    typeof v !== "undefined" && v !== "" && v != null
      ? true
      : "Поле обязательно для заполнения",
});

const store = useStore();
const emails = computed(() => {
  return store.state.emails.item;
});

const canEdit = computed(() => {
  return props.id === null;
});
const selectedDistricts = computed({
  get() {
    return store.state.emails.item.district_list;
  },
  set(newValue) {
    store.state.emails.item.district_list = newValue;
  },
});
const selectedOrganizations = computed({
  get() {
    return store.state.emails.item.org_list;
  },
  set(newValue) {
    store.state.emails.item.org_list = newValue;
  },
});
const selectedPersonRoles = computed({
  get() {
    return store.state.emails.item.pers_role_list;
  },
  set(newValue) {
    store.state.emails.item.pers_role_list = newValue;
  },
});

onMounted(() => {
  if (props.id != null) {
    store.commit("SET_LOADING", "emailForm");
    store.dispatch("getItem", props.id).then(() => {
      store.commit("REMOVE_LOADING", "emailForm");
    });
  } else {
    store.commit("SET_ITEM", {});
  }
});

function submitForm() {
  if (valid.value === true) {
    store.state.emails.item.org_list = selectedOrganizations;
    store.state.emails.item.district_list = selectedDistricts;
    store.state.emails.item.pers_role_list = selectedPersonRoles;
    store.dispatch("submitForm");
  }
}
</script>

<style scoped>
.icon-img img {
  max-width: 150px;
}
.btn-submit {
  margin-right: 15px;
}
.email-list {
  margin-top: 15px;
}
</style>
