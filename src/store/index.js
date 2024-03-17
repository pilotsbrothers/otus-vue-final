import { createStore } from "vuex";
import app from "./modules/app";
import auth from "./modules/auth";
import emails from "./modules/emails";
import sms from "./modules/sms";

export default createStore({
  modules: {
    app,
    auth,
    emails,
    sms,
  },
});
