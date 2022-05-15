<script setup>
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { getCurrentInstance, onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ApiList } from "../apis/dataType";
import generatePostList from "../composables/generatePostList";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const route = useRoute();
const store = useStore();

const allCategories = computed(() => store.state.categories.categoryList);
const allTags = computed(() => store.state.tags.tagList);
const allUsers = computed(() => store.state.users.userList);

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentUserId) {
    var currentUser = allUsers.value.find((u) => u.id === currentUserId);
    dataLoadingText.value = `正在加载作者【${currentUser.name}】`;
    //landing组件
    store.commit("setPostMeta", {
        title: "作者：" + currentUser.name,
        time: "",
        bg: "",
    });
    //查找当前作者下所有post
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postList({ author: currentUserId }).then(function (data) {
        postList.value = [];
        generateList(allCategories.value, allTags.value, data.result);
        dataLoadingText.value = `作者【${currentUser.name}】加载成功`;
        setTimeout(() => (loadingMaskRequired.value = false), 500);
    });
    renderTimes.value += 1;
};

watch(
    () => route.params["uid"],
    (n, o) => {
        if (renderTimes.value && n) {
            renderView(parseInt(n));
        }
    }
);

onMounted(() => {
    store.commit("setBreadcrumbNav", []);
    renderView(parseInt(route.params["uid"]));
});
</script>

<template>
    <div class="authorLoadingMask" v-show="loadingMaskRequired">
        <ThemeLoading
            :logoRequired="false"
            :loadingText="dataLoadingText"
        ></ThemeLoading>
    </div>
    <PostList :postList="postList" v-show="!loadingMaskRequired"></PostList>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
.authorLoadingMask {
    @include flex-center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid var(--theme-color-pale);
    box-shadow: var(--theme-shadow);
}
</style>
