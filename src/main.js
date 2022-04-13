import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.mount("#app")
