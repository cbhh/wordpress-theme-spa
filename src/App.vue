<script setup>
import { provide, readonly, onMounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { RouterView, useRoute } from "vue-router";
import getTags from "./init/getTags";
import getSettings from "./init/getSettings";
import getCategories from "./init/getCategories";
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

const { tagList, getTagList } = getTags();
const { siteMeta, getSiteSettings } = getSettings();
const { categoryList, getCategoryList } = getCategories();
const store = useStore();
const route = useRoute();

const landingMap = {
    home: HomeLanding,
    post: PostArchiveLanding,
    archive: PostArchiveLanding,
};

const routeName = ref("");

const currentLandingComponent = computed(() => landingMap[routeName.value]);

const hierarchicCategoryList = computed(
    () => store.state.categories.hierarchicCategoryList
);
const breadcrumbNavList = computed(
    () => store.state.breadcrumb.categoryNavList
);

provide("site-meta", readonly(siteMeta));

//侦听一个getter
//https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watch
watch(
    () => route.name,
    (n, o) => {
        if (["author", "category", "tag"].includes(n)) {
            routeName.value = "archive";
        } else {
            routeName.value = n;
        }
    }
);

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
    <KeepAlive>
        <component
            :is="currentLandingComponent"
            :landingType="routeName"
        ></component
    ></KeepAlive>
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
                </template>
            </SiteSidebar>
        </div>
    </div>
    <SiteFooter></SiteFooter>
</template>

<style lang="scss">
@import "@sty/main.scss";
@import "@sty/variable.scss";

#app {
    position: relative;
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
