<script setup>
import { provide, readonly, onMounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";
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
//调用各组合式函数并解构出数据和对应操作函数
const { tagList, getTagList } = getTags(),
    { siteMeta, getSiteSettings } = getSettings(),
    { categoryList, getCategoryList } = getCategories(),
    { userList, getUserList } = getUsers(),
    { dateList, getDates } = getMonthPostDates();
//初始化store和route
const store = useStore(),
    route = useRoute(),
    router = useRouter();
/**
 * 几种可能的着陆页组件，当切换不同种类（首页/文章页/内容归档页）的页面时，会选择不同的landing组件
 */
const landingMap = {
        home: HomeLanding,
        post: PostArchiveLanding,
        archive: PostArchiveLanding,
    },
    /**
     * 数据加载状态，显示在loading组件中
     */
    dataLoadingText = ref(""),
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
     * 当前路由名
     */
    routeName = ref("home");
/**
 * 当前选用的着陆页组件
 */
const currentLandingComponent = computed(() => landingMap[routeName.value]),
    /**
     * 层次型分类列表，由wordpress api返回的扁平型列表计算得出
     */
    hierarchicCategoryList = computed(
        () => store.state.categories.hierarchicCategoryList
    ),
    /**
     * 面包屑导航（除了"首页"以外的部分）列表
     */
    breadcrumbNavList = computed(() => store.state.breadcrumb.categoryNavList);
//站点设置信息注入，方便后代组件访问
provide("site-meta", readonly(siteMeta));

//侦听一个getter
//https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch
//侦听路由名称变化，以选择不同的着陆页组件
watch(
    () => route.name,
    (n, o) => {
        if (["author", "category", "tag"].includes(n)) {
            routeName.value = "archive";
        } else if (n === "post") {
            routeName.value = "post";
        } else {
            routeName.value = "home";
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
        store.commit("storeTagList", tagList.value);
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
        store.commit("storeCategoryList", categoryList.value);
        dataLoadingText.value = "分类列表准备完成";
        dataLoadingCompletedItem.value += 1;
    });
    //加载用户（作者）列表并存储进vuex
    getUserList().then(() => {
        store.commit("storeUserList", userList.value);
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
            :landingType="routeName"
        ></component
    ></KeepAlive>
    <!--着陆页组件切换end-->
    <div id="primary">
        <SitePrimaryMaskTop></SitePrimaryMaskTop>
        <div class="primary-content">
            <div class="site-content">
                <SitePrimaryBreadcrumb
                    :categoryList="breadcrumbNavList"
                ></SitePrimaryBreadcrumb>
                <main>
                    <RouterView></RouterView>
                </main>
            </div>
            <SiteSidebar position="left">
                <template v-slot:top>侧边栏1</template>
                <template v-slot:body>
                    <SiteSidebarItem
                        itemTitle="分类"
                        funcClass="post-categories"
                    >
                        <Category
                            :categoryList="hierarchicCategoryList"
                        ></Category>
                    </SiteSidebarItem>
                </template>
            </SiteSidebar>
            <SiteSidebar position="right">
                <template v-slot:top>侧边栏2</template>
                <template v-slot:body>
                    <SiteSidebarItem
                        itemTitle="标签云"
                        funcClass="post-tag-cloud"
                    >
                        <Tag :tagList="tagList"></Tag>
                    </SiteSidebarItem>
                    <SiteSidebarItem itemTitle="日历" funcClass="post-calendar">
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
    <back-to-top :visible="true"></back-to-top>
</template>

<style lang="scss">
@import "@sty/main.scss";
@import "@sty/fix.scss";
@import "@sty/variable.scss";

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
#primary {
    @media (max-width: $media-small-size) {
        > .primary-mask-top {
            --offset-x: 4px;
            > div {
                background-size: 25% auto;
            }
        }
        > .primary-content {
            grid-template-columns: 100%;
            grid-template-rows: repeat(3, auto);
            > .site-content {
                grid-column: initial;
                grid-row: 1 / 2;
            }
            > .site-sidebar-left {
                grid-column: initial;
                grid-row: 2 / 3;
            }
            > .site-sidebar-right {
                grid-column: initial;
                grid-row: 3 / 4;
            }
        }
    }
    @media (max-width: $media-smaller-size) {
        > .primary-mask-top {
            > div {
                background-size: 30%;
                transform: rotateX(45deg);
            }
        }
    }
    @media (max-width: $media-smallest-size) {
        > .primary-mask-top {
            --offset-x: 3px;
            > div {
                background-size: 40%;
                height: 9px;
                top: -8px;
            }
        }
    }
    @media (max-width: $media-mini-size) {
        > .primary-mask-top {
            --offset-x: 2px;
        }
    }
    @media (max-width: $media-minier-size) {
        > .primary-mask-top > div {
            background-size: 50%;
        }
    }
}
.primary-content {
    display: grid;
    grid-template-columns: $sidebar-grid-width $content-grid-width $sidebar-grid-width;
    > .site-content {
        grid-column: 2 / 3;
        grid-row-start: 1;
    }
    > .site-sidebar-left {
        grid-column: 1 / 2;
        grid-row-start: 1;
    }
    > .site-sidebar-right {
        grid-column: 3 / 4;
        grid-row-start: 1;
    }
}
.site-content {
    margin: 0 $site-content-horizontal-margin 125px
        $site-content-horizontal-margin;
    display: flex;
    flex-direction: column;
    @media (max-width: $media-small-size) {
        margin: 0;
        > main {
            border-left: 2px solid var(--theme-color);
            border-bottom: 2px solid var(--theme-color);
            border-right: 2px solid var(--theme-color);
            box-shadow: var(--theme-shadow);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }

    > main {
        flex: 1;
        padding: 25px 25px 35px 25px;
        margin: 0 25px;
        background: url(@ass/47ff0c21443ce5f94a6bee19199d0fbe-crop.jpeg) repeat;
        background-size: 20%;
        @media (max-width: $media-smallest-size) {
            padding: 15px;
            background-size: 25%;
        }
        @media (max-width: $media-mini-size) {
            padding: 10px;
            margin: 0 10px;
        }
        @media (max-width: $media-minier-size) {
            background-size: 30%;
        }
    }
}
</style>
