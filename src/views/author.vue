<script setup lang="ts">
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { getCurrentInstance, onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { appUseStore } from "@/store";
import { ApiList } from "@/apis/apis";
import generatePostList from "../composables/generatePostList";

const $apis: ApiList = (function () {
        var ins = getCurrentInstance();
        if (ins) {
            return ins.appContext.config.globalProperties.$apis;
        }
    })(),
    route = useRoute(),
    store = appUseStore();

const allCategories = computed(() => store.state.categoryModule.categoryList),
    allTags = computed(() => store.state.tagModule.tagList),
    allUsers = computed(() => store.state.userModule.userList);

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentUserId: number) {
    var currentUser = allUsers.value.find((u) => u.id === currentUserId);
    if (currentUser && $apis) {
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载作者【${currentUser.name}】`;
        //landing组件
        store.commit("pageMetaModule/storeUserList", {
            title: "作者：" + currentUser.name,
            time: "",
            background: "",
        });
        //查找当前作者下所有post
        $apis.getPostList({ author: currentUserId }).then(function (data) {
            postList.value = [];
            generateList(allCategories.value, allTags.value, data.result);
            dataLoadingText.value = `作者【${
                currentUser && currentUser.name
            }】加载成功`;
            setTimeout(() => (loadingMaskRequired.value = false), 500);
        });
        renderTimes.value += 1;
    }
};

watch(
    () => route.params["uid"],
    (n, o) => {
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
    <div class="postListLoadingMask" v-show="loadingMaskRequired">
        <ThemeLoading
            :logoRequired="false"
            :loadingText="dataLoadingText"
        ></ThemeLoading>
    </div>
    <PostList :list="postList" v-show="!loadingMaskRequired"></PostList>
</template>
