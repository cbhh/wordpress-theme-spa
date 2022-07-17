<script
    setup
    lang="ts"
>
import PostList from "../components/layout/content/PostList.vue";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import stores from "@/stores";
import usePostListGenerator from "@/composables/usePostListGenerator";
import getPostList from "@/apis/getPostList";

const route = useRoute(),
    { useTagStore, usePageMetaStore } = stores,
    tagStore = useTagStore(),
    pageMetaStore = usePageMetaStore();

const { postList, generateList } = usePostListGenerator();

let renderTimes = 0;

async function renderView (currentTagSlug: string) {
    const currentTag = await tagStore.getTagDetailBySlugAsync(currentTagSlug);
    if (currentTag) {
        const currentTagId = currentTag.id;
        //landing组件
        pageMetaStore.storeBreadcrumbList({
            title: "标签：" + currentTag.name,
        });
        //查找当前标签下所有post
        getPostList({ tags: [currentTagId] }).then(function (data) {
            if (data) {
                generateList(data.result);
            }
        });
        renderTimes += 1;
    }
}

watch(
    () => route.params["tag"],
    (n) => {
        if (renderTimes && n) {
            renderView(n.toString());
        }
    }
);

onMounted(() => {
    renderView(route.params["tag"].toString());
});
</script>

<template>
    <PostList :list="postList" />
</template>
