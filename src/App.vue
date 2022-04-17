<script setup>
import { provide, readonly, onMounted } from "vue";
import { useStore } from "vuex";
import getTags from "./init/getTags";
import getSettings from "./init/getSettings";
import getCategories from "./init/getCategories";
import SiteHeader from "./components/layout/header/SiteHeader.vue";
import HomeLanding from "./components/layout/landing/HomeLanding.vue";

const { tagList, getTagList } = getTags();
const { siteMeta, getSiteSettings } = getSettings();
const { categoryList, getCategoryList } = getCategories();
const store = useStore();

provide("site-meta", readonly(siteMeta));

onMounted(() => {
    getTagList().then(() => {
        store.commit("storeTagList", tagList.value);
    });
    getSiteSettings().then(() => {
        console.log(siteMeta.description + " " + siteMeta.title);
    });
    getCategoryList().then(() => {
        store.commit("storeCategoryList", categoryList.value);
    });
});
</script>

<template>
    <SiteHeader></SiteHeader>
    <HomeLanding></HomeLanding>
</template>

<style>
@import "@sty/main.css";
</style>
