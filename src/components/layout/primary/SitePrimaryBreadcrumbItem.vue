<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
    slug: {
        type: String,
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
});
</script>

<template>
    <span class="breadcrumb-separator">
        <i class="fa fa-angle-right"></i>
    </span>
    <RouterLink
        :to="{ name: 'category', params: { cat: props.slug } }"
        class="breadcrumb-category"
    >
        {{ props.name }}</RouterLink
    >
</template>

<style lang="scss" scoped>
.breadcrumb-separator {
    color: var(--theme-color-gray);
    margin: 0 5px;
    + .breadcrumb-category:hover {
        color: var(--theme-color-gray);
    }
}
</style>
