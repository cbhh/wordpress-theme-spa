import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import store, { key } from "./store";
import router from "./router";
import "./global/windowScroll";

const pinia = createPinia();
const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(pinia);

app.mount("#app");