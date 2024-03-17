import { useRouter } from 'vue-router'
import _ from 'lodash'
import { useStore } from 'vuex'

export function redirectToAvailableRoute(routes) {
  const router = useRouter()
  console.log('redirect')
  if (!routes.length) return
  for (let route of routes) {
    if (route.isMenuItem && !route.hidden) {
      return router.push({ name: route.name })
    }
  }
}

export function setSidebarMenuAvailableRoutesList() {
  const router = useRouter()
  const store = useStore()
  const routes = _.cloneDeep(router.options.routes)
  routes.forEach((route) => {
    if (!route.isMenuItem) return
    setRouteVisibility(route)
  })
  const sideBarMenuRoutesList = routes.filter((route) => {
    return route.isMenuItem && !route.hidden
  })
  store.commit('SET_SIDEBAR_AVAILABLE_ROUTES_LIST', sideBarMenuRoutesList)
}

export function setRouteVisibility(route) {
  const store = useStore()
  if (route.meta && route.meta.group) {
    route.hidden = false
  }
}
