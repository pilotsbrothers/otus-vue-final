<template>
  <section class="page-block">
    <v-row>
      <v-col>
        <router-link :to="{ name: 'CreateEmails' }">
          <v-btn rounded="0" class="">Добавить</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table-server
          :items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="totalItems"
          :items="items"
          :loading="!isLoaded"
          item-value="name"
          @update:options="loadItems"
        >
          <template #item="{ item }">
            <tr>
              <td>
                <router-link :to="'/emails/' + item.id">{{ item.subject }}</router-link>
              </td>
              <td v-if="item.total_count === item.success_count"><v-chip color="green">Завершена</v-chip></td><td v-else><v-chip color="yellow">В процессе</v-chip></td>
              <td>{{ item.total_count }}</td>
              <td>{{ item.success_count }}</td>
              <td>{{ item.failed_count }}</td>
              <td class="text-right">{{ formatDate(item.createdAt) }}</td>
            </tr>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import moment from "moment";

const headers = [
  {
    title: 'Тема письма',
    align: 'start',
    sortable: false,
    key: 'subject'
  },
  {
    title: 'Статус',
    align: 'start',
    sortable: false,
    key: 'status'
  },
  {
    title: 'Количество получателей',
    align: 'start',
    sortable: false,
    key: 'total_count'
  },
  {
    title: 'Отправлено',
    align: 'start',
    sortable: false,
    key: 'success_count'
  },
  {
    title: 'С ошибками',
    align: 'start',
    sortable: false,
    key: 'failed_count'
  },
  {
    title: 'Добавлено',
    align: 'end',
    sortable: false,
    key: 'createdAt'
  }
]

const itemsPerPage = ref(100)
const store = useStore()

const items = computed(() => {
  return store.state.emails.items.data
})
const totalItems = computed(() => {
  return store.state.emails.items.meta.total
})
const isLoaded = computed(() => {
  return store.state.emails.isLoaded
})

function formatDate(date) {
  if (!date) return ''
  return moment(date).format('DD.MM.YYYY')
}

function loadItems({ page, itemsPerPage, sortBy }) {
  store.dispatch('getItems', { page, itemsPerPage, sortBy })
}
</script>

<style rel="stylesheet/scss" lang="scss"></style>
