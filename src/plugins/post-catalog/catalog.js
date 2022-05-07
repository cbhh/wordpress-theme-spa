import Catalog from "./Catalog.vue";

export default {
    install: function (app, options) {
        app.component("catalog", Catalog);
    }
}