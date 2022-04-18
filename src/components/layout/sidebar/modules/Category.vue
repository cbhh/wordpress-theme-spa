<script setup>
import CategoryItem from './CategoryItem.vue';
const props = defineProps({
    categoryList: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <CategoryItem
        v-for="item in props.categoryList"
        :key="item.id"
        :slug="item.slug"
        :count="item.count"
        :id="item.id"
        :name="item.name"
        :children="item.children"
    >
    </CategoryItem>
</template>
