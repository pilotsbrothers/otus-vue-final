import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";
import DefaultLayout from "./layout/DefaultLayout.vue";
import GeneralLayout from "./layout/GeneralLayout.vue";
import Vuetify from "./plugins/vuetify";
import "./styles/index.scss";
import "./styles/variables.scss";

export const app = createApp({
  setup() {},
  render: () => h(App),
})
  .use(Vuetify)
  .use(router)
  .use(store);
app.component("DefaultLayout", DefaultLayout);
app.component("GeneralLayout", GeneralLayout);
app.mount("#app");
