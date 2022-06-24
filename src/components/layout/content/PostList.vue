<script
    setup
    lang="ts"
>
import PostListItem from "./PostListItem.vue";
import { PostListItemType } from "@/components/props";

interface PostListType {
    list: PostListItemType[];
}

const props = withDefaults(defineProps<PostListType>(), {
    list: () => [],
});
</script>

<template>
    <TransitionGroup
        name="post-list"
        tag="div"
        class="post-list"
    >
        <PostListItem
            v-for="post in props.list"
            :key="post.id"
            :id="post.id"
            :thumbnail="post.thumbnail"
            :category="post.category"
            :tag="post.tag"
            :date="post.date"
            :title="post.title"
            :excerpt="post.excerpt"
        />
    </TransitionGroup>
</template>

<style
    lang="scss"
    scoped
>
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
.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.5s linear;
}
.post-list-leave-active {
    position: absolute;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
