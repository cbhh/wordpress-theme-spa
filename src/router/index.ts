import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import homeVue from "../views/home.vue";
import categoryVue from "../views/category.vue";
import tagVue from "../views/tag.vue";
import authorVue from "../views/author.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/category/:cat",
        name: "category",
        component: categoryVue,
    },
    {
        path: "/tag/:tag",
        name: "tag",
        component: tagVue,
    },
    {
        path: "/author/:uid",
        name: "author",
        component: authorVue,
    },
    {
        path: "/post/:pid",
        name: "post",
        component: () => import("../views/post.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: homeVue,
    },
];

export default createRouter({
    routes: routes,
    history: createWebHistory(),
});
