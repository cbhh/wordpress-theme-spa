import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/category/:cat",
        name: "category",
        component: () => import("../views/category.vue"),
    },
    {
        path: "/tag/:tag",
        name: "tag",
        component: () => import("../views/tag.vue"),
    },
    {
        path: "/author/:uid",
        name: "author",
        component: () => import("../views/author.vue"),
    },
    {
        path: "/post/:pid",
        name: "post",
        component: () => import("../views/post.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/home.vue"),
    },
];

export default createRouter({
    routes: routes,
    history: createWebHistory(),
});
