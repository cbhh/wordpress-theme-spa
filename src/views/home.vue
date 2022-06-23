<script
    setup
    lang="ts"
>
import { ref, onMounted } from "vue";
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import usePostListGenerator from "@/composables/usePostListGenerator";
import getPostList from "@/apis/getPostList";

const { postList, generateList } = usePostListGenerator();

const loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

onMounted(() => {
    loadingMaskRequired.value = true;
    dataLoadingText.value = "正在加载最近文章";
    getPostList().then(function (data) {
        if (data) {
            generateList(data.result);
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
