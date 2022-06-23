<script
    setup
    lang="ts"
>
import stores from "./stores";
import { onMounted, provide, readonly } from "vue";
import { useRouter, RouterView, useRoute } from "vue-router";
import Category from "./components/layout/sidebar/modules/Category.vue";
import Tag from "./components/layout/sidebar/modules/Tag.vue";
import Calendar from "./components/layout/sidebar/modules/Calendar.vue";
import SitePrimaryBreadcrumb from "./components/layout/primary/SitePrimaryBreadcrumb.vue";
import Layout from "./components/layout/layout.vue";
import ThemeLoading from "./components/common/ThemeLoading.vue";
import BackToTop from "./widgets/back-to-top/BackToTop.vue";
import useBackToTop from "./widgets/back-to-top/useBackToTop";
import windowScroll from "./global/windowScroll";
import useRouteListener from "./composables/init/useRouteListener";
import getSettings from "./composables/init/getSettings";
import getMonthPostDates from "./composables/getMonthPostDates";

const { useCategoryStore, useTagStore, useUserStore, useBreadcrumbStore } =
        stores,
    categoryStore = useCategoryStore(),
    tagStore = useTagStore(),
    userStore = useUserStore(),
    breadcrumbStore = useBreadcrumbStore(),
    router = useRouter(),
    route = useRoute();

const current = new Date(),
    resourceCount = 4,
    isLowPpi = document.documentElement.classList.contains("pixel-ratio-low");

const { loadingFlag, loadingText, loadingMaskRequired, landingType } =
        useRouteListener(route, router, resourceCount),
    { siteMeta, getSiteSettings } = getSettings(),
    { dateList, getDates } = getMonthPostDates(),
    { backToTopVisible, switchBackToTopVisible } = useBackToTop();

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
    //加载当前月份文章提供给日历数据
    getDates(current);
    //添加切换回到顶部按钮可见性的窗口滚动事件处理器
    windowScroll.addHandle("back-to-top-visible", null, switchBackToTopVisible);
});
</script>

<template>
    <div
        id="loading-mask"
        v-if="loadingMaskRequired"
    >
        <ThemeLoading
            :logo-required="true"
            :loading-text="loadingText"
        />
        <p v-if="isLowPpi">
            检测到低分辨率屏幕，主题字体（楷体）将更换为系统默认字体
        </p>
    </div>
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
        <template #sidebar-calendar>
            <Calendar
                :current="current"
                :has-post-dates="dateList"
            />
        </template>
    </Layout>
    <back-to-top :visible="backToTopVisible" />
</template>

<style lang="scss">
@import "@sty/main.scss";
@import "@sty/fix.scss";
@import "@sty/common.scss";
#app {
    position: relative;
}
#loading-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
</style>
