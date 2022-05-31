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
    allTags = computed(() => store.state.tagModule.tagList),
    allUsers = computed(() => store.state.userModule.userList);

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentUserId: number) {
    const currentUser = allUsers.value.find((u) => u.id === currentUserId);
    if (currentUser) {
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载作者【${currentUser.name}】`;
        //landing组件
        store.commit("pageMetaModule/setPageMeta", {
            title: "作者：" + currentUser.name,
            time: "",
            background: "",
        });
        //查找当前作者下所有post
        getPostList({ author: currentUserId }).then(function (data) {
            if (data) {
                postList.value = [];
                generateList(allCategories.value, allTags.value, data.result);
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
    store.commit("breadcrumbModule/setBreadcrumbNav", []);
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
