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
    children: {
        type: Array,
        required: false,
    },
});
</script>

<template>
    <li class="cat-item">
        <RouterLink :to="{ name: 'catalogue', params: { cat: props.slug } }">
            {{ props.name }}</RouterLink
        >
        {{ props.count }}
        <ul class="children" v-if="props.children">
            <CatalogueItem
                v-for="subItem in props.children"
                :key="subItem.id"
                :slug="subItem.slug"
                :count="subItem.count"
                :id="subItem.id"
                :name="subItem.name"
                :children="subItem.children"
            ></CatalogueItem>
        </ul>
    </li>
</template>
