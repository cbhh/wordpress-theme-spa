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
        <span class="tag-link-count">({{ props.count }})</span>
    </RouterLink>
</template>

<style lang="scss" scoped>
.tag-cloud-link {
    background: var(--theme-color-pale);
    border-radius: 20px;
    color: #fff;
    padding: 8px;
    transition: var(--theme-transition);
    display: inline-block;
    margin: 3px;
    line-height: 1;
    > .tag-link-count {
        font-size: 0.6rem;
    }
    &:hover {
        background: var(--theme-color);
    }
}
</style>
