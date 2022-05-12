import Gallery from "./Gallery.vue";

export default {
    install: function (app, options) {
        app.component("post-gallery", Gallery);
    }
}