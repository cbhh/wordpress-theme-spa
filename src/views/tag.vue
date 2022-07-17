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

function renderView (currentTagId: number) {
    const currentTag = tagStore.getTagDetailById(currentTagId);
    if (currentTag) {
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
    } else {
        pageMetaStore.storeBreadcrumbList({
            title:  "该标签已被移除",
        });
    }
    renderTimes += 1;
}

watch(
    () => route.params["tid"],
    (n) => {
        if (renderTimes && n) {
            renderView(parseInt(n.toString()));
        }
    }
);

onMounted(() => {
    renderView(parseInt(route.params["tid"].toString()));
});
</script>

<template>
    <PostList :list="postList" />
</template>
