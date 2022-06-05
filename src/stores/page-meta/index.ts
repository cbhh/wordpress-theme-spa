import PageMetaStateTypes from "./i";
import { defineStore } from "pinia";

export default defineStore("page-meta", {
    state: (): PageMetaStateTypes => ({
        title: "",
        time: "",
        background: "",
    }),
    actions: {
        storeBreadcrumbList (data: PageMetaStateTypes) {
            this.title = data.title;
            this.time = data.time;
            this.background = data.background;
        },
    },
});
