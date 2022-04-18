import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue"

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
        path: "/post/:id",
        name: "post"
    },
    {
        path: "/",
        name: "home",
        component: home
    }
]

export default createRouter({
    routes: routes,
    history: createWebHistory()
})