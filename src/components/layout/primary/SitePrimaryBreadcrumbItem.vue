<script setup lang="ts">
import { RouterLink } from "vue-router";

interface T {
    /**
     * category id
     */
    id: number;
    /**
     * 名称
     */
    name: string;
}

const props = withDefaults(defineProps<T>(), {
    name: "",
    id: 0,
});
</script>

<template>
    <span class="breadcrumb-separator">
        <i class="fa fa-angle-right" />
    </span>
    <RouterLink
        :to="{ name: 'category', params: { cid: props.id } }"
        class="breadcrumb-category"
    >
        {{ props.name }}
    </RouterLink>
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
