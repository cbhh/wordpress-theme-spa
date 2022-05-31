<script setup lang="ts">
import TagItem from "./TagItem.vue";
import { TagListItemWithSize } from "@/store/modules/tag/i";

interface T {
    list: TagListItemWithSize[];
}

const props = withDefaults(defineProps<T>(), {
    list: () => [],
});
</script>

<template>
    <TagItem
        v-for="item in props.list"
        :key="item.id"
        :slug="item.slug"
        :count="item.count"
        :id="item.id"
        :name="item.name"
        :size="item.size"
    />
</template>
