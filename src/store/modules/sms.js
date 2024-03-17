import api from "../../services/api";
import store from "../index";
import router from "../../router";

const sms = {
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
    SET_SMS_ITEMS(state, val) {
      state.items = val;
    },
    SET_SMS_ITEM(state, val) {
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
    async getSmsItems({ commit }, params) {
      await api
        .get(
          "/api/v1/notification/sms?perPage=" +
            params.itemsPerPage +
            "&page=" +
            params.page,
        )
        .then((res) => {
          commit("SET_SMS_ITEMS", res.data);
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

    async getSmsItem({ commit }, id) {
      commit("SET_IS_LOADED", false);
      await api
        .get("/api/v1/notification/sms/" + id)
        .then((res) => {
          commit("SET_SMS_ITEM", res.data.data);
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

    submitSmsForm() {
      return api
        .post("/api/v1/notification/sms", {
          data: this.state.sms.item,
        })
        .then((res) => {
          if (res.data.data !== null) {
            store.dispatch("ShowAlert", { text: "Сохранено", type: "success" });
            router.push({ name: "ListSms" });
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

export default sms;
