import api from "../../services/api";
import store from "../index";
import router from "../../router";

const emails = {
  state: {
    items: {
      data: [],
      meta: [],
    },
    item: {
      subordination_list: [],
      district_list: [],
      org_list: [],
      pers_role_list: [],
    },
    districts: [],
    organizations: [],
    isLoaded: false,
  },
  mutations: {
    SET_IS_LOADED(state, val) {
      state.isLoaded = val;
    },
    SET_ITEMS(state, val) {
      state.items = val;
    },
    SET_ITEM(state, val) {
      state.item = val;
    },
    SET_DISTRICTS(state, val) {
      state.districts = val;
    },
    SET_ORGANIZATIONS(state, val) {
      state.organizations = val;
    },
  },
  actions: {
    async getItems({ commit }, params) {
      await api
        .get(
          "/api/v1/notification/email?perPage=" +
            params.itemsPerPage +
            "&page=" +
            params.page,
        )
        .then((res) => {
          commit("SET_ITEMS", res.data);
          commit("SET_IS_LOADED", true);
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data.message);
          } else {
            throw err;
          }
        });
    },

    async getItem({ commit }, id) {
      commit("SET_IS_LOADED", false);
      await api
        .get("/api/v1/notification/email/" + id)
        .then((res) => {
          commit("SET_ITEM", res.data.data);
          commit("SET_IS_LOADED", true);
        })
        .catch((err) => {
          if (err.response) {
            throw new Error(err.response.data.message);
          } else {
            throw err;
          }
        });
    },

    submitForm() {
      return api
        .post("/api/v1/notification/email", {
          data: this.state.emails.item,
        })
        .then((res) => {
          if (res.data.data !== null) {
            store.dispatch("ShowAlert", { text: "Сохранено", type: "success" });
            router.push({ name: "ListEmails" });
            //return res.data.data
          }
        })
        .catch((err) => {
          if (err.response) {
            store.dispatch("ShowAlert", {
              text: "Ошибка при сохранении",
              type: "error",
            });
          } else {
            throw err;
          }
        });
    },
  },
};

export default emails;
