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
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: import.meta.env.VITE_BASE_URL + "api-platform/graphql",
});
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
})
  .use(Vuetify)
  .use(router)
  .use(store);
app.component("DefaultLayout", DefaultLayout);
app.component("GeneralLayout", GeneralLayout);
app.mount("#app");
