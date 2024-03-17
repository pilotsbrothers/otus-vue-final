import { createVuetify } from "vuetify";
import * as directives from "vuetify/directives";
import * as components from "vuetify/components";
import { md3 } from "vuetify/blueprints";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import ru from "vuetify/lib/locale/ru";
import { VBtn } from "vuetify/components/VBtn";

const customTheme = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#005677",
    secondary: "#005677",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  directives,
  components,
  blueprint: md3,
  aliases: {
    VBtnInversed: VBtn,
  },
  defaults: {
    VBtn: {
      color: "#00465e",
      variant: "elevated",
      rounded: false,
    },
    VBtnInversed: {
      color: "#fff",
      variant: "elevated",
      rounded: false,
    },
    VTable: {
      backgroundColor: "#fff",
    },
  },
  lang: {
    locales: { ru },
    current: "ru",
  },
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
});
