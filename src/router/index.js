import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue"

const routes = [
    {
        path: "/category/:cat",
        name: "category",
        component: () => import("../views/category.vue")
    },
    {
        path: "/tag/:tag",
        name: "tag",
        component: () => import("../views/tag.vue")
    },
    {
        path: "/author/:id",
        name: "author"
    },
    {
        path: "/post/:id",
        name: "post",
        component: () => import("../views/post.vue")
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