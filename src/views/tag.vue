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

const { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentTagSlug) {
    var currentTag = allTags.value.find((t) => t.slug === currentTagSlug),
        currentTagId = currentTag.id;
    dataLoadingText.value = `正在加载标签【${currentTag.name}】`;
    //landing组件
    store.commit("setPostMeta", {
        title: "标签：" + currentTag.name,
        time: "",
        bg: "",
    });
    //查找当前标签下所有post
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postList({ tags: currentTagId }).then(function (data) {
        postList.value = [];
        generateList(allCategories.value, allTags.value, data.result);
        dataLoadingText.value = `标签【${currentTag.name}】加载成功`;
        setTimeout(() => (loadingMaskRequired.value = false), 500);
    });
    renderTimes.value += 1;
};

watch(
    () => route.params["tag"],
    (n, o) => {
        if (renderTimes.value && n) {
            renderView(n);
        }
    }
);

onMounted(() => {
    store.commit("setBreadcrumbNav", []);
    renderView(route.params["tag"]);
});
</script>

<template>
    <div class="tagLoadingMask" v-show="loadingMaskRequired">
        <ThemeLoading
            :logoRequired="false"
            :loadingText="dataLoadingText"
        ></ThemeLoading>
    </div>
    <PostList :postList="postList" v-show="!loadingMaskRequired"></PostList>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
.tagLoadingMask {
    @include flex-center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid var(--theme-color-pale);
    box-shadow: var(--theme-shadow);
}
</style>
