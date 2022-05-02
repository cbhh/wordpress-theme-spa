import BackToTop from "./BackToTop.vue";

export default {
    install: function (app, options) {
        app.component("back-to-top", BackToTop);
    }
}