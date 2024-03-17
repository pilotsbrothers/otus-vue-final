import router from './router'
import store from "./store";

const anonymousUserRoutesList = ['/auth']

router.beforeEach((to, from, next) => {
  const isAnonymousUserRoute = anonymousUserRoutesList.indexOf(to.path) !== -1

    if (!isAnonymousUserRoute && store.state.app.isLoggedIn) {
      //next({ path: '/' })
      next()
    } else {
      if(!isAnonymousUserRoute && !store.state.app.isLoggedIn){
        next('/auth')
      } else {
        next()
      }
    }
})
