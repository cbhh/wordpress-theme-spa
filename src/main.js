import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";
import store from "./store";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.use(store);
app.use(router);

app.mount("#app")
