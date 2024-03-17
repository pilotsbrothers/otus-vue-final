// import Cookies from 'js-cookie'

const app = {
  state: {
    isLoggedIn: false,
    loadings: [],
    alertsList: [],
    lastAlertID: 0,
    drawer: true,
    sidebar: {
      availableRoutesList: [],
    },
    user: {
      login: "admin",
      passwd: "admin",
    },
  },
  mutations: {
    SET_IS_LOGGED_IN(state, status) {
      state.isLoggedIn = status;
    },
    SET_LOADING(state, key) {
      state.loadings = Object.assign({ [key]: true }, state.loadings);
    },
    REMOVE_LOADING(state, key) {
      const loadings = Object.assign({}, state.loadings);
      delete loadings[key];

      state.loadings = loadings;
    },
    ADD_ALERT_TO_LIST: (state, data) => {
      state.alertsList.push({
        id: state.lastAlertID,
        isPermanent: data.isPermanent || false,
        text: data.text,
        type: data.type,
      });
      state.lastAlertID++;
    },
    REMOVE_ALERT_FROM_LIST: (state, id) => {
      console.log(id);
      state.alertsList = state.alertsList.filter((alert) => alert.id !== id);
    },
    SET_SIDEBAR_AVAILABLE_ROUTES_LIST(state, data) {
      state.sidebar.availableRoutesList = data;
    },
  },
  actions: {
    ShowAlert({ commit }, data) {
      commit("ADD_ALERT_TO_LIST", data);
    },
    ClearAlert({ commit }, id) {
      commit("REMOVE_ALERT_FROM_LIST", id);
    },
  },
};

export default app;
