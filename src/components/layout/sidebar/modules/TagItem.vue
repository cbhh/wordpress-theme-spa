<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
    slug: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    size: {
        type: Number,
        required: false,
    },
});
</script>

<template>
    <RouterLink
        class="tag-cloud-link"
        :to="{ name: 'tag', params: { tag: props.slug } }"
        :style="{ 'font-size': props.size ? props.size + 'rem' : 'unset' }"
    >
        {{ props.name }}
        <span class="tag-link-count">{{ props.count }}</span>
    </RouterLink>
</template>
