import { createApp } from "vue";
import ElementPlus from "element-plus";
import { createI18n } from "vue-i18n";
import * as VueRouter from "vue-router";

import "@style/index.scss";
import "element-plus/dist/index.css";

import zhTW from "@lang/zh-tw.json";
import enUS from "@lang/en-us.json";

import App from "@/App.vue";
import PHome from "@components/pages/p-home.vue";
import apiPlugin from "@plugins/api";

export const i18n = createI18n({
  locale: "zh-TW",
  messages: {
    "zh-TW": zhTW,
    "en-US": enUS,
  },
});

const routes: Array<VueRouter.RouteRecordRaw> = [
  { path: "/", redirect: i18n.global.locale },
  { path: "/:lang", component: PHome },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory("/"),
  routes,
});

const app = createApp(App);

app.use(i18n);
app.use(ElementPlus);
app.use(router);
app.use(apiPlugin);
app.mount("#app");
