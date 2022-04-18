import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/category/:cat",
        name: "category"
    },
    {
        path: "/tag/:tag",
        name: "tag"
    },
    {
        path: "/",
        name: "home"
    }
]

export default createRouter({
    routes: routes,
    history: createWebHistory()
})