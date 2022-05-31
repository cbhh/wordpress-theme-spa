<script setup lang="ts">
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { appUseStore } from "@/store";
import generatePostList from "../composables/generatePostList";
import getPostList from "@/apis/getPostList";

const route = useRoute(),
    store = appUseStore();

const allCategories = computed(() => store.state.categoryModule.categoryList),
    allTags = computed(() => store.state.tagModule.tagList);

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentTagSlug: string) {
    var currentTag = allTags.value.find((t) => t.slug === currentTagSlug);
    if (currentTag) {
        var currentTagId = currentTag.id;
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载标签【${currentTag.name}】`;
        //landing组件
        store.commit("pageMetaModule/setPageMeta", {
            title: "标签：" + currentTag.name,
            time: "",
            background: "",
        });
        //查找当前标签下所有post
        getPostList({ tags: [currentTagId] }).then(function (data) {
            if (data) {
                postList.value = [];
                generateList(allCategories.value, allTags.value, data.result);
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
    (n, o) => {
        if (renderTimes.value && n) {
            renderView(n.toString());
        }
    }
);

onMounted(() => {
    store.commit("breadcrumbModule/setBreadcrumbNav", []);
    renderView(route.params["tag"].toString());
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
