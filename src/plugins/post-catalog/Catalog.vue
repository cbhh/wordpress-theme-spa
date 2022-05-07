<script setup>
import CatalogItem from "./CatalogItem.vue";
const props = defineProps({
    catalogItemList: {
        type: Array,
        required: true,
    },
});
const emits = defineEmits(["clickedItem"]);
/**
 * 将对应anchor值的项传递给父组件
 * @param {String} anchor 点击的目录项的anchor值
 */
const getClickedItem = function (anchor) {
    emits("clickedItem", props.catalogItemList[anchor]);
};
</script>

<template>
    <div class="catalog-body">
        <CatalogItem
            v-for="item in props.catalogItemList"
            :key="item.anchor"
            :itemText="item.text"
            :itemLevel="item.level"
            :itemAnchor="item.anchor"
            :itemHref="item.href"
            :isCurrent="item.current"
            @itemClick="getClickedItem"
        ></CatalogItem>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";

.catalog-body {
    max-height: 100%;
    max-width: 100%;
    overflow: scroll;
}
</style>
