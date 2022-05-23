import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";
import store, { key } from "./store";
import router from "./router";
import "./global/windowScroll";

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.use(store, key);
app.use(router);

app.mount("#app");
