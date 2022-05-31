<script setup lang="ts">
import CategoryItem from "./CategoryItem.vue";
import { CategoryTree } from "@/store/modules/category/i";

interface T {
    list: CategoryTree[];
}
const props = withDefaults(defineProps<T>(), {
    list: () => [],
});
</script>

<template>
    <CategoryItem
        v-for="item in props.list"
        :key="item.id"
        :slug="item.slug"
        :count="item.count"
        :id="item.id"
        :name="item.name"
        :children="item.children"
    />
</template>
