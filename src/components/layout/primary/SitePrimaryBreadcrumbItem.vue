<script setup lang="ts">
import { RouterLink } from "vue-router";
import { BreadcrumbItemType } from "@/components/props";

interface T extends BreadcrumbItemType {
    nonce?: number;
}

const props = withDefaults(defineProps<T>(), {
    name: "",
    slug: "",
    id: 0,
    nonce: 0,
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
