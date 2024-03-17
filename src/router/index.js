import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { setSidebarMenuAvailableRoutesList } from '../utils/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      beforeEnter: () => {
        setSidebarMenuAvailableRoutesList()
      }
    },
    {
      path: '/404',
      name: 'NotFoundPage',
      component: () => import('../views/NotFoundPage.vue'),
      meta: {
        layout: 'GeneralLayout'
      }
    },
    {
      path: '/auth',
      name: 'Authentication',
      component: () => import('../views/OAuthPage.vue'),
      meta: {
        layout: 'GeneralLayout'
      }
    },

    {
      path: '/emails',
      name: 'ListEmails',
      title: 'Email-рассылка',
      isMenuItem: true,
      meta: {
        icon: 'services',
        breadCrumbs: [
          {
            text: 'Email-рассылка',
            disabled: true
          }
        ]
      },
      component: () => import('../views/Emails/ListPage.vue')
    },
    {
      path: '/emails/create',
      name: 'CreateEmails',
      title: 'Email-рассылка',
      isMenuItem: false,
      meta: {
      },
      component: () => import('../views/Emails/CreatePage.vue')
    },
    {
      path: '/emails/:id',
      name: 'ItemEmail',
      title: 'Email-рассылка',
      isMenuItem: false,
      meta: {
      },
      props(route) {
        return { id: parseInt(route.params.id, 10) }
      },
      component: () => import('../views/Emails/ItemPage.vue')
    },
    {
      path: '/sms',
      name: 'ListSms',
      title: 'Sms-рассылка',
      isMenuItem: true,
      meta: {
        icon: 'services',
        breadCrumbs: [
          {
            text: 'Sms-рассылка',
            disabled: true
          }
        ]
      },
      component: () => import('../views/Sms/ListPage.vue')
    },
    {
      path: '/sms/create',
      name: 'CreateSms',
      title: 'Sms-рассылка',
      isMenuItem: false,
      meta: {
      },
      component: () => import('../views/Sms/CreatePage.vue')
    },
    {
      path: '/sms/:id',
      name: 'ItemSms',
      title: 'Sms-рассылка',
      isMenuItem: false,
      meta: {
      },
      props(route) {
        return { id: parseInt(route.params.id, 10) }
      },
      component: () => import('../views/Sms/ItemPage.vue')
    },
    {
      path: '/users',
      name: 'Users',
      title: 'Пользователи',
      isMenuItem: true,
      meta: {
        icon: 'users',
        breadCrumbs: [
          {
            text: 'Пользователи',
            disabled: true
          }
        ]
      }
    }
  ]
})

const loaderName = 'router_pageLoad'

router.beforeEach((to, from, next) => {
  if (to.name !== from.name) {
    store.commit('SET_LOADING', loaderName)
  }
  next()
})

router.afterEach((to, from) => {
  if (store.state.app.loadings[loaderName]) {
    store.commit('REMOVE_LOADING', loaderName)
  }
  if (to.path !== from.path) window.scrollTo(0, 0)
})

export default router
