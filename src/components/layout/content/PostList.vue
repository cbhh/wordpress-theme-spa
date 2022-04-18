<script setup>
import PostListItem from "./PostListItem.vue";
const props = defineProps({
    postList: {
        type: Array,
        required: false,
    },
});
</script>

<template>
    <div class="post-list">
        <PostListItem
            v-for="post in props.postList"
            :key="post.id"
            :id="post.id"
            :thumbnail="post.thumbnail"
            :category="post.category"
            :tag="post.tag"
            :date="post.date"
            :title="post.title"
            :excerpt="post.excerpt"
        >
        </PostListItem>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.post-list {
    padding: 20px 20px 10px 20px;
    @media (max-width: $media-mini-size) {
        padding: 10px;
    }
    @media (max-width: $media-minier-size) {
        padding: 8px;
    }
}
</style>
