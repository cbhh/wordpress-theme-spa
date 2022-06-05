<script
    setup
    lang="ts"
>
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import stores from "@/stores";
import generatePostList from "../composables/generatePostList";
import getPostList from "@/apis/getPostList";

const route = useRoute(),
    { useTagStore, useCategoryStore, useUserStore, usePageMetaStore } = stores,
    tagStore = useTagStore(),
    categoryStore = useCategoryStore(),
    userStore = useUserStore(),
    pageMetaStore = usePageMetaStore();

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentUserId: number) {
    const currentUser = userStore.getUserDetailById(currentUserId);
    if (currentUser) {
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载作者【${currentUser.name}】`;
        //landing组件
        pageMetaStore.storeBreadcrumbList({
            title: "作者：" + currentUser.name,
        });
        //查找当前作者下所有post
        getPostList({ author: currentUserId }).then(function (data) {
            if (data) {
                postList.value = [];
                generateList(
                    categoryStore.categoryList,
                    tagStore.tagList,
                    data.result
                );
                dataLoadingText.value = `作者【${
                    currentUser && currentUser.name
                }】加载成功`;
                setTimeout(() => (loadingMaskRequired.value = false), 500);
            }
        });
        renderTimes.value += 1;
    }
};

watch(
    () => route.params["uid"],
    (n) => {
        if (renderTimes.value && n) {
            renderView(parseInt(n.toString()));
        }
    }
);

onMounted(() => {
    renderView(parseInt(route.params["uid"].toString()));
});
</script>

<template>
    <div
        class="postListLoadingMask"
        v-show="loadingMaskRequired"
    >
        <ThemeLoading
            :logo-required="false"
            :loading-text="dataLoadingText"
        />
    </div>
    <PostList
        :list="postList"
        v-show="!loadingMaskRequired"
    />
</template>
