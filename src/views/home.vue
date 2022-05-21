<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import { appUseStore } from "@/store";
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import generatePostList from "../composables/generatePostList";
import { ApiList } from "@/apis/apis";

const store = appUseStore();

const $apis: ApiList = (function () {
    var ins = getCurrentInstance();
    if (ins) {
        return ins.appContext.config.globalProperties.$apis;
    }
})();

const allCategories = computed(() => store.state.categoryModule.categoryList);
const allTags = computed(() => store.state.tagModule.tagList);

const { postList, generateList } = generatePostList();

const loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

onMounted(() => {
    loadingMaskRequired.value = true;
    dataLoadingText.value = "正在加载最近文章";
    $apis &&
        $apis.getPostList().then(function (data) {
            generateList(allCategories.value, allTags.value, data.result);
            dataLoadingText.value = "最近文章加载成功";
            setTimeout(() => (loadingMaskRequired.value = false), 500);
        });
});
</script>

<template>
    <div class="postListLoadingMask" v-show="loadingMaskRequired">
        <ThemeLoading
            :logoRequired="false"
            :loadingText="dataLoadingText"
        ></ThemeLoading>
    </div>
    <PostList :list="postList" v-show="!loadingMaskRequired"></PostList>
</template>
