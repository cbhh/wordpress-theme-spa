<script setup>
import PostList from "../components/layout/content/PostList.vue";
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

const renderTimes = ref(0);

const renderView = function (currentTagSlug) {
    var currentTag = allTags.value.find((t) => t.slug === currentTagSlug),
        currentTagId = currentTag.id;
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
    $api.postTag(currentTagId).then(function (data) {
        postList.value = [];
        generateList(allCategories.value, allTags.value, data.result);
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
    <PostList :postList="postList"></PostList>
</template>
