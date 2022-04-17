import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";
import store from "./store";

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.use(store);

app.mount("#app")
