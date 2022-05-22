import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";
import store, { key } from "./store";
import router from "./router";
import "./global/windowScroll";
import gallery from "./plugins/post-gallery/gallery";

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.use(store, key);
app.use(router);
app.use(gallery);

app.mount("#app");
