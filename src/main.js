import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";
import store from "./store";
import router from "./router";
import backToTop from "./plugins/back-to-top/backToTop";

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.use(store);
app.use(router);
app.use(backToTop);

app.mount("#app")
