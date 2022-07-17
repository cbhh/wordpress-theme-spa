<script setup lang="ts">
import { RouterLink } from "vue-router";
import SitePrimaryBreadcrumbItem from "./SitePrimaryBreadcrumbItem.vue";
import { BreadcrumbItemType } from "@/components/props";

interface BreadcrumbListType {
    list: BreadcrumbItemType[];
}

const props = withDefaults(defineProps<BreadcrumbListType>(), {
    list: () => [],
});
</script>

<template>
    <div class="breadcrumb-area">
        <div class="breadcrumb-nav">
            <RouterLink
                class="to-home"
                :to="{ name: 'home' }"
            >
                <i class="fa fa-home" />首页
            </RouterLink>
            <SitePrimaryBreadcrumbItem
                v-for="item in props.list"
                :key="item.id"
                :id="item.id"
                :name="item.name"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.breadcrumb-area {
    position: relative;
    background: url(@ass/db8a37c82fe95b87a34e92b554178108-m.png) repeat;
    background-size: 25% auto;
    padding: 20px 0;
    width: calc(100% + 40px);
    right: 20px;
    z-index: 2;
    box-shadow: 0 1px 3px #000;
    > .breadcrumb-nav {
        margin: 0 50px;
        padding: 5px 10px;
        line-height: 20px;
        border: 2px solid var(--theme-color);
        box-sizing: border-box;
        box-shadow: 0 0 5px #333;
        background: #fff;
        font-family: var(--theme-font-compatible);
        > .to-home {
            > i {
                margin-right: 3px;
                color: var(--theme-color);
                transition: var(--theme-transition);
            }
            &:hover {
                color: var(--theme-color-gray);
                > i {
                    color: var(--theme-color-gray);
                }
            }
        }
    }
    @media (max-width: $media-small-size) {
        width: 100%;
        left: 0;
        right: 0;
    }
    @media (max-width: $media-smaller-size) {
        background-size: 30%;
    }
    @media (max-width: $media-smallest-size) {
        background-size: 40%;
        > .breadcrumb-nav {
            margin: 0 40px;
        }
    }
    @media (max-width: $media-minier-size) {
        background-size: 50%;
        padding: 15px 0;
        > .breadcrumb-nav {
            margin: 0 20px;
        }
    }
}
</style>
