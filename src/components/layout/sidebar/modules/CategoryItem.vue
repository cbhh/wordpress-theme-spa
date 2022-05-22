<script setup lang="ts">
import { RouterLink } from "vue-router";

interface T {
    id: number;
    count: number;
    name: string;
    slug: string;
    children?: T[];
}

const props = withDefaults(defineProps<T>(), {
    id: 0,
    count: 0,
    name: "",
    slug: "",
});
</script>

<template>
    <li class="cat-item">
        <RouterLink :to="{ name: 'category', params: { cat: props.slug } }">
            {{ props.name }}</RouterLink
        >
        ({{ props.count }})
        <ul class="children" v-if="props.children">
            <CategoryItem
                v-for="subItem in props.children"
                :key="subItem.id"
                :slug="subItem.slug"
                :count="subItem.count"
                :id="subItem.id"
                :name="subItem.name"
                :children="subItem.children"
            ></CategoryItem>
        </ul>
    </li>
</template>

<style lang="scss" scoped>
.cat-item {
    font-size: 14px;
    color: var(--theme-color-gray);
    > a {
        font-size: initial;
        &:hover {
            color: var(--theme-color-gray);
        }
    }
    > .children {
        margin-left: 1rem;
    }
}
@media (max-width: 1100px) {
    .cat-item,
    .cat-item a {
        font-size: 0.9rem;
    }
}
</style>
