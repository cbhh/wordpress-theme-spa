<script setup lang="ts">
import { RouterLink } from "vue-router";

interface T {
    id: number;
    name: string;
    /**
     * 是否启用分隔符
     */
    divider?: boolean;
}

const props = withDefaults(defineProps<T>(), {
    name: "",
    id: 0,
    divider: true,
});
</script>

<template>
    <li class="post-tag-item">
        <RouterLink :to="{ name: 'tag', params: { tid: props.id } }">
            {{ props.name }}
        </RouterLink>
        <span v-if="props.divider">/</span>
    </li>
</template>

<style lang="scss" scoped>
.post-tag-item {
    span {
        color: var(--theme-color-gray);
        margin: 0 5px;
    }
    a:hover {
        color: var(--theme-color-gray);
    }
}
</style>
