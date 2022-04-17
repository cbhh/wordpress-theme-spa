<script setup>
import CatalogueItem from "./CatalogueItem.vue";
const props = defineProps({
    catalogueList: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <CatalogueItem
        v-for="item in props.catalogueList"
        :key="item.id"
        :slug="item.slug"
        :count="item.count"
        :id="item.id"
        :name="item.name"
        :children="item.children"
    >
    </CatalogueItem>
</template>
