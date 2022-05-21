<script setup lang="ts">
import { RouterLink } from "vue-router";
import { PostDetailTagItemType } from "@/components/props";

interface T extends PostDetailTagItemType {
    nonce?: number;
}

const props = withDefaults(defineProps<T>(), {
    name: "",
    slug: "",
    divider: true,
    nonce: 0,
});
</script>

<template>
    <li class="post-tag-item">
        <RouterLink :to="{ name: 'tag', params: { tag: props.slug } }">
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
