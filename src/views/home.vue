<script
    setup
    lang="ts"
>
import { ref, onMounted } from "vue";
import stores from "@/stores";
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import generatePostList from "../composables/generatePostList";
import getPostList from "@/apis/getPostList";

const { useTagStore, useCategoryStore } = stores,
    tagStore = useTagStore(),
    categoryStore = useCategoryStore();

const { postList, generateList } = generatePostList();

const loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

onMounted(() => {
    loadingMaskRequired.value = true;
    dataLoadingText.value = "正在加载最近文章";
    getPostList().then(function (data) {
        if (data) {
            generateList(
                categoryStore.categoryList,
                tagStore.tagList,
                data.result
            );
            dataLoadingText.value = "最近文章加载成功";
            setTimeout(() => (loadingMaskRequired.value = false), 500);
        }
    });
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
