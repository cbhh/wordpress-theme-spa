import { createApp } from "vue";
import App from "./App.vue";
import apis from "./apis";
import store from "./store";
import router from "./router";
import "./global/windowScroll";
import backToTop from "./plugins/back-to-top/backToTop";
import catalog from "./plugins/post-catalog/catalog";
import gallery from "./plugins/post-gallery/gallery"

const app = createApp(App);
app.config.globalProperties.$apis = apis;

app.use(store);
app.use(router);
app.use(backToTop);
app.use(catalog);
app.use(gallery);

app.mount("#app")
