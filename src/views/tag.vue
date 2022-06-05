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
    { useTagStore, useCategoryStore, usePageMetaStore } = stores,
    tagStore = useTagStore(),
    categoryStore = useCategoryStore(),
    pageMetaStore = usePageMetaStore();

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentTagSlug: string) {
    const currentTag = tagStore.getTagDetailBySlug(currentTagSlug);
    if (currentTag) {
        const currentTagId = currentTag.id;
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载标签【${currentTag.name}】`;
        //landing组件
        pageMetaStore.storeBreadcrumbList({
            title: "标签：" + currentTag.name,
        });
        //查找当前标签下所有post
        getPostList({ tags: [currentTagId] }).then(function (data) {
            if (data) {
                postList.value = [];
                generateList(
                    categoryStore.categoryList,
                    tagStore.tagList,
                    data.result
                );
                dataLoadingText.value = `标签【${
                    currentTag && currentTag.name
                }】加载成功`;
                setTimeout(() => (loadingMaskRequired.value = false), 500);
            }
        });
        renderTimes.value += 1;
    }
};

watch(
    () => route.params["tag"],
    (n) => {
        if (renderTimes.value && n) {
            renderView(n.toString());
        }
    }
);

onMounted(() => {
    renderView(route.params["tag"].toString());
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
