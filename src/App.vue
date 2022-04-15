<script setup>
import wpAppConfig from "@wpAppConfig";
import { provide, reactive, readonly, getCurrentInstance } from "vue";
import SiteHeader from "./components/layout/header/SiteHeader.vue";
import HomeLanding from "./components/layout/landing/HomeLanding.vue";

//全局实例fetch请求方法
const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;

//站点信息注入全局
const siteMeta = reactive({
    title: "",
    logo: wpAppConfig.siteLogo,
    description: "",
    home: wpAppConfig.siteUrl,
});

$apis.setting().then(function (data) {
    siteMeta.title = data.title;
    siteMeta.description = data.description;
});

provide("site-meta", readonly(siteMeta));
</script>

<template>
    <SiteHeader></SiteHeader>
    <HomeLanding></HomeLanding>
</template>

<style>
@import "@sty/main.css";
</style>
