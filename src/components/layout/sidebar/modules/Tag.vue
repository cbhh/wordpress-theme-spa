<script setup lang="ts">
import TagItem from "./TagItem.vue";
import { TagListItemWithSize } from "@/stores/tag/i";

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
        :count="item.count"
        :id="item.id"
        :name="item.name"
        :size="item.size"
    />
</template>
