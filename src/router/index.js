import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/catalogue/:cat",
        name: "catalogue"
    },
    {
        path: "/tag/:tag",
        name: "tag"
    }
]

export default createRouter({
    routes: routes,
    history: createWebHistory()
})