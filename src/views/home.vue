<script
    setup
    lang="ts"
>
import { onMounted } from "vue";
import PostList from "../components/layout/content/PostList.vue";
import usePostListGenerator from "@/composables/usePostListGenerator";
import getPostList from "@/apis/getPostList";

const { postList, generateList } = usePostListGenerator();

onMounted(() => {
    getPostList().then(function (data) {
        if (data) {
            generateList(data.result);
        }
    });
});
</script>

<template>
    <PostList :list="postList" />
</template>
