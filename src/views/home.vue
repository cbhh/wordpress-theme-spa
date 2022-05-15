<script setup>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import { useStore } from "vuex";
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { ApiList } from "../apis/dataType";
import generatePostList from "../composables/generatePostList";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const store = useStore();

const allCategories = computed(() => store.state.categories.categoryList);
const allTags = computed(() => store.state.tags.tagList);

const { postList, generateList } = generatePostList();

const loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

onMounted(() => {
    dataLoadingText.value = "正在加载最近文章";
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postList().then(function (data) {
        generateList(allCategories.value, allTags.value, data.result);
        dataLoadingText.value = "最近文章加载成功";
        setTimeout(() => (loadingMaskRequired.value = false), 500);
    });
});
</script>

<template>
    <div class="homeLoadingMask" v-show="loadingMaskRequired">
        <ThemeLoading
            :logoRequired="false"
            :loadingText="dataLoadingText"
        ></ThemeLoading>
    </div>
    <PostList :postList="postList" v-show="!loadingMaskRequired"></PostList>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
.homeLoadingMask {
    @include flex-center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid var(--theme-color-pale);
    box-shadow: var(--theme-shadow);
}
</style>
