<script setup>
import SiteSidebarItem from "../../components/layout/sidebar/SiteSidebarItem.vue";
import CatalogItem from "./CatalogItem.vue";
const props = defineProps({
    catalogItemList: {
        type: Array,
        required: true,
    },
    visible: {
        type: Boolean,
        required: false,
        default: true,
    },
});
const emits = defineEmits(["clickedItem"]);
/**
 * 将数据中对应anchor值的项传递给父组件
 * @param {String} item 点击的目录项数据
 */
const getClickedItem = function (item) {
    emits("clickedItem", item);
};
</script>

<template>
    <SiteSidebarItem
        itemTitle="文章目录"
        class="post-catalog"
        :class="{ hidden: !props.visible }"
    >
        <div class="catalog-body">
            <CatalogItem
                v-for="item in props.catalogItemList"
                :key="item.anchor"
                :itemText="item.text"
                :itemLevel="item.level"
                :itemAnchor="item.anchor"
                :itemHref="item.href"
                :isCurrent="item.current"
                @click="getClickedItem(item)"
            ></CatalogItem>
        </div>
    </SiteSidebarItem>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.post-catalog {
    transition: var(--theme-transition);
    background: none;
    border: none;
    border-radius: 10px;
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    margin: 5px;
    display: flex;
    max-height: calc(100% - $header-height - 10px);
    max-width: calc($sidebar-width-percentage - 10px);
    &.hidden {
        transform: translateX(calc(-100% - 15px));
        opacity: 0;
    }
    .catalog-body {
        max-height: 100%;
        max-width: 100%;
        overflow: scroll;
    }
    @media (max-width: $media-small-size) {
        max-width: 25%;
    }
    @media (max-width: $media-smallest-size) {
        max-width: 35%;
    }
    @media (max-width: $media-mini-size) {
        max-width: 45%;
    }
    @media (max-width: $media-minier-size) {
        max-width: 55%;
    }
}
</style>
