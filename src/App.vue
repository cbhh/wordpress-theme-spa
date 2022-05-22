<script setup lang="ts">
import { provide, readonly, onMounted, computed, ref, watch } from "vue";
import { appUseStore } from "./store";
import { RouterView, useRoute, useRouter } from "vue-router";
import getTags from "./composables/init/getTags";
import getSettings from "./composables/init/getSettings";
import getCategories from "./composables/init/getCategories";
import getUsers from "./composables/init/getUsers";
import getMonthPostDates from "./composables/getMonthPostDates";
import SiteHeader from "./components/layout/header/SiteHeader.vue";
import HomeLanding from "./components/layout/landing/HomeLanding.vue";
import PostArchiveLanding from "./components/layout/landing/PostArchiveLanding.vue";
import SiteFooter from "./components/layout/footer/SiteFooter.vue";
import SitePrimaryMaskTop from "./components/layout/primary/SitePrimaryMaskTop.vue";
import SitePrimaryBreadcrumb from "./components/layout/primary/SitePrimaryBreadcrumb.vue";
import SiteSidebar from "./components/layout/sidebar/SiteSidebar.vue";
import SiteSidebarItem from "./components/layout/sidebar/SiteSidebarItem.vue";
import Category from "./components/layout/sidebar/modules/Category.vue";
import Tag from "./components/layout/sidebar/modules/Tag.vue";
import Calendar from "./components/layout/sidebar/modules/Calendar.vue";
import ThemeLoading from "./components/common/ThemeLoading.vue";
import windowScroll from "./global/windowScroll";
import {
    NoHomeLandingType,
    SidebarPosition,
    SidebarItemFeature,
} from "./components/props";

const { tagList, getTagList } = getTags(),
    { siteMeta, getSiteSettings } = getSettings(),
    { categoryList, getCategoryList } = getCategories(),
    { userList, getUserList } = getUsers(),
    { dateList, getDates } = getMonthPostDates();
//初始化store和router
const store = appUseStore(),
    route = useRoute(),
    router = useRouter();
/**
 * 数据加载状态，显示在loading组件中
 */
const dataLoadingText = ref(""),
    /**
     * 加载完成的数据项
     */
    dataLoadingCompletedItem = ref(0),
    /**
     * 是否需要加载遮罩层
     */
    loadingMaskRequired = ref(true),
    /**
     * 当前日期
     */
    currentDate = new Date(),
    /**
     * 当前landing组件类型
     */
    landingType = ref<NoHomeLandingType | "home">("home"),
    /**
     * 回到顶部按钮可见性
     */
    backToTopVisible = ref(false);
/**
 * 当前选用的着陆页组件
 */
const currentLandingComponent = computed(() => {
        switch (landingType.value) {
            case "home":
                return HomeLanding;
            case NoHomeLandingType.archive:
            case NoHomeLandingType.post:
                return PostArchiveLanding;
            default:
                return null;
        }
    }),
    /**
     * 层次型分类列表，由wordpress api返回的扁平型列表计算得出
     */
    hierarchicCategoryList = computed(
        () => store.state.categoryModule.hierarchicCategoryList
    ),
    /**
     * 面包屑导航（除了"首页"以外的部分）列表
     */
    breadcrumbNavList = computed(() => store.state.breadcrumbModule.list);
//站点设置信息注入，方便后代组件访问
provide("site-meta", readonly(siteMeta));
/**
 * 根据窗口滚动切换回到顶部按钮可见性
 * @param wsy window scroll y
 * @param wh window inner height
 */
const switchBackToTopVisible = function (wsy: number, wh: number) {
    backToTopVisible.value = wsy > wh ? true : false;
};
//侦听一个getter
//https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch
//侦听路由名称变化，以选择不同的着陆页组件
watch(
    () => route.name,
    (n, o) => {
        if (n && typeof n === "string") {
            if (["author", "category", "tag"].includes(n)) {
                landingType.value = NoHomeLandingType.archive;
            } else if (n === "post") {
                landingType.value = NoHomeLandingType.post;
            } else {
                landingType.value = "home";
            }
        }
    }
);
//侦听数据加载状态变化，加载完成后跳转至home页面
watch(
    () => dataLoadingCompletedItem.value,
    (n, o) => {
        if (n === 4 && o < 4) {
            dataLoadingText.value = "即将跳转至首页";
            setTimeout(() => {
                router.push({ name: "home" });
                loadingMaskRequired.value = false;
            }, 1000);
        }
    }
);
//组件挂载之后，执行数据请求操作
onMounted(() => {
    dataLoadingText.value = "正在加载站点数据";
    //加载标签列表并存储进vuex
    getTagList().then(() => {
        store.commit("tagModule/storeTagList", tagList.value);
        dataLoadingText.value = "标签列表准备完成";
        dataLoadingCompletedItem.value += 1;
    });
    //加载站点设置
    getSiteSettings().then(() => {
        dataLoadingText.value = "站点设置准备完成";
        dataLoadingCompletedItem.value += 1;
    });
    //加载分类列表并存储进vuex
    getCategoryList().then(() => {
        store.commit("categoryModule/storeCategoryList", categoryList.value);
        dataLoadingText.value = "分类列表准备完成";
        dataLoadingCompletedItem.value += 1;
    });
    //加载用户（作者）列表并存储进vuex
    getUserList().then(() => {
        store.commit("userModule/storeUserList", userList.value);
        dataLoadingText.value = "作者列表准备完成";
        dataLoadingCompletedItem.value += 1;
    });
    const month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear();
    //查找当前月中发布了post的日期（仅供日历显示用）
    getDates(
        `${year}-${month > 9 ? month : "0" + month}-01`,
        `${year}-${month > 9 ? month : "0" + month}-31`
    );
    //添加切换回到顶部按钮可见性的窗口滚动事件处理器
    windowScroll.addHandle("back-to-top-visible", null, switchBackToTopVisible);
});
</script>

<template>
    <div id="loading-mask" v-if="loadingMaskRequired">
        <ThemeLoading
            :logoRequired="true"
            :loadingText="dataLoadingText"
        ></ThemeLoading>
    </div>
    <SiteHeader></SiteHeader>
    <!--着陆页组件切换start-->
    <KeepAlive>
        <component
            :is="currentLandingComponent"
            :landingType="landingType"
        ></component
    ></KeepAlive>
    <!--着陆页组件切换end-->
    <div id="primary">
        <SitePrimaryMaskTop></SitePrimaryMaskTop>
        <div class="primary-content">
            <div class="site-content">
                <SitePrimaryBreadcrumb
                    :list="breadcrumbNavList"
                ></SitePrimaryBreadcrumb>
                <main>
                    <RouterView></RouterView>
                </main>
            </div>
            <SiteSidebar :position="SidebarPosition.left">
                <template v-slot:top>侧边栏1</template>
                <template v-slot:body>
                    <SiteSidebarItem
                        title="分类"
                        :feature="SidebarItemFeature['post-categories']"
                    >
                        <Category :list="hierarchicCategoryList"></Category>
                    </SiteSidebarItem>
                </template>
            </SiteSidebar>
            <SiteSidebar :position="SidebarPosition.right">
                <template v-slot:top>侧边栏2</template>
                <template v-slot:body>
                    <SiteSidebarItem
                        title="标签云"
                        :feature="SidebarItemFeature['post-tag-cloud']"
                    >
                        <Tag :list="tagList"></Tag>
                    </SiteSidebarItem>
                    <SiteSidebarItem
                        title="日历"
                        :feature="SidebarItemFeature['post-calendar']"
                    >
                        <Calendar
                            :current="currentDate"
                            :hasPostDates="dateList"
                        ></Calendar>
                    </SiteSidebarItem>
                </template>
            </SiteSidebar>
        </div>
    </div>
    <SiteFooter></SiteFooter>
    <back-to-top :visible="backToTopVisible"></back-to-top>
</template>

<style lang="scss">
@import "@sty/main.scss";
@import "@sty/fix.scss";
@import "@sty/skeleton.scss";
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
