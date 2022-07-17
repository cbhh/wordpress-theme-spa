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
    { useUserStore, usePageMetaStore } = stores,
    userStore = useUserStore(),
    pageMetaStore = usePageMetaStore();

const { postList, generateList } = usePostListGenerator();

let renderTimes = 0;

async function renderView (currentUserId: number) {
    const currentUser = await userStore.getUserDetailByIdAsync(currentUserId);
    if (currentUser) {
        //landing组件
        pageMetaStore.storeBreadcrumbList({
            title: "作者：" + currentUser.name,
        });
        //查找当前作者下所有post
        getPostList({ author: currentUserId }).then(function (data) {
            if (data) {
                generateList(data.result);
            }
        });
        renderTimes += 1;
    }
}

watch(
    () => route.params["uid"],
    (n) => {
        if (renderTimes && n) {
            renderView(parseInt(n.toString()));
        }
    }
);

onMounted(() => {
    renderView(parseInt(route.params["uid"].toString()));
});
</script>

<template>
    <PostList :list="postList" />
</template>
