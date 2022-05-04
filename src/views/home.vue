<script setup>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import { useStore } from "vuex";
import PostList from "../components/layout/content/PostList.vue";
import { ApiList } from "../apis/dataType";
import generatePostList from "../composables/generatePostList";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const store = useStore();

const allCategories = computed(() => store.state.categories.categoryList);
const allTags = computed(() => store.state.tags.tagList);

const { postList, generateList } = generatePostList();

onMounted(() => {
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postList().then(function (data) {
        generateList(allCategories.value, allTags.value, data.result);
    });
});
</script>

<template>
    <PostList :postList="postList"></PostList>
</template>

<style></style>
