<script setup>
import { provide, readonly, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { RouterView } from "vue-router";
import getTags from "./init/getTags";
import getSettings from "./init/getSettings";
import getCategories from "./init/getCategories";
import SiteHeader from "./components/layout/header/SiteHeader.vue";
import HomeLanding from "./components/layout/landing/HomeLanding.vue";
import SitePrimaryMaskTop from "./components/layout/primary/SitePrimaryMaskTop.vue";
import SiteSidebar from "./components/layout/sidebar/SiteSidebar.vue";
import SiteSidebarItem from "./components/layout/sidebar/SiteSidebarItem.vue";
import Catalogue from "./components/layout/sidebar/modules/Catalogue.vue";
import Tag from "./components/layout/sidebar/modules/Tag.vue";

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

const hierarchicCategoryList = computed(() => {
    return store.state.categories.hierarchicCategoryList;
});
</script>

<template>
    <SiteHeader></SiteHeader>
    <HomeLanding></HomeLanding>
    <div id="primary">
        <SitePrimaryMaskTop></SitePrimaryMaskTop>
        <div class="primary-content">
            <div class="site-content">
                <RouterView></RouterView>
            </div>
            <SiteSidebar position="left">
                <template v-slot:top>侧边栏1</template>
                <template v-slot:body>
                    <SiteSidebarItem
                        itemTitle="分类"
                        funcClass="post-catalogues"
                    >
                        <Catalogue
                            :catalogueList="hierarchicCategoryList"
                        ></Catalogue>
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
</style>
