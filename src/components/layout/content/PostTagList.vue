<script setup>
import { computed } from "vue";
import PostTagListItem from "./PostTagListItem.vue";
const props = defineProps({
    tagList: {
        type: Array,
        required: true,
    },
});
const tagListLength = computed(() =>
    props.tagList ? props.tagList.length : 0
);
</script>

<template>
    <div class="post-tag">
        <i class="fa fa-tags"></i>
        <ul>
            <PostTagListItem
                v-for="(item, index) in props.tagList"
                :key="item.id"
                :slug="item.slug"
                :name="item.name"
                :divider="index !== tagListLength - 1"
            ></PostTagListItem>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.post-tag {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > i {
        color: var(--theme-color);
        margin-right: 10px;
    }
    > ul {
        display: flex;
        align-items: center;
    }
}
</style>
