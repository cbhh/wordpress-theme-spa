<script setup>
import TagItem from "./TagItem.vue";
const props = defineProps({
    tagList: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <TagItem
        v-for="item in props.tagList"
        :key="item.id"
        :slug="item.slug"
        :count="item.count"
        :id="item.id"
        :name="item.name"
        :size="item.size"
    >
    </TagItem>
</template>
