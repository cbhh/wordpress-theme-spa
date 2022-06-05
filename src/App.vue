<script
    setup
    lang="ts"
>
import stores from "./stores";
import { onMounted, provide, readonly } from "vue";
import { useRouter, RouterView, useRoute } from "vue-router";
import Category from "./components/layout/sidebar/modules/Category.vue";
import Tag from "./components/layout/sidebar/modules/Tag.vue";
import SitePrimaryBreadcrumb from "./components/layout/primary/SitePrimaryBreadcrumb.vue";
import Layout from "./components/layout/layout.vue";
import useRouteListener from "./composables/init/useRouteListener";
import getSettings from "./composables/init/getSettings";

const { useCategoryStore, useTagStore, useUserStore, useBreadcrumbStore } =
        stores,
    categoryStore = useCategoryStore(),
    tagStore = useTagStore(),
    userStore = useUserStore(),
    breadcrumbStore = useBreadcrumbStore(),
    router = useRouter(),
    route = useRoute();

const { loadingFlag, landingType } = useRouteListener(route, router, 4),
    { siteMeta, getSiteSettings } = getSettings();

//注入site meta数据
provide("site-meta", readonly(siteMeta));

onMounted(() => {
    //加载站点设置
    getSiteSettings().then(() => {
        loadingFlag.value += 1;
    });
    //调用state中的加载category列表action
    categoryStore.getCategorylist().then(() => {
        loadingFlag.value += 1;
    });
    //调用state中的加载tag列表action
    tagStore.getTagList().then(() => {
        loadingFlag.value += 1;
    });
    //调用state中的加载user列表action
    userStore.getUserlist().then(() => {
        loadingFlag.value += 1;
    });
});
</script>

<template>
    <Layout :landing-type="landingType">
        <template #breadcrumb-nav>
            <SitePrimaryBreadcrumb :list="breadcrumbStore.list" />
        </template>
        <template #view>
            <RouterView />
        </template>
        <template #sidebar-category>
            <Category :list="categoryStore.hierarchicCategoryList" />
        </template>
        <template #sidebar-tag>
            <Tag :list="tagStore.tagList" />
        </template>
    </Layout>
</template>

<style lang="scss">
@import "@sty/main.scss";
@import "@sty/fix.scss";
@import "@sty/common.scss";
#app {
    position: relative;
}
</style>
