<script setup>
import PostList from "../components/layout/content/PostList.vue";
import {
    getCurrentInstance,
    onMounted,
    ref,
    computed,
    onUnmounted,
    watch,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ApiList } from "../apis/dataType";
import getAncestorCategories from "../composables/getAncestorCategories";
import getDescendantCategories from "../composables/getDescendantCategories";
import generatePostList from "../composables/generatePostList";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const route = useRoute();
const store = useStore();

const allCategories = computed(() => store.state.categories.categoryList);
const allTags = computed(() => store.state.tags.tagList);

const { ancestors, getParent } = getAncestorCategories(allCategories.value);
const { descendants, getNextLvCats } = getDescendantCategories(
    allCategories.value
);
const { postList, generateList } = generatePostList();

const renderTimes = ref(0);

const renderView = function (currentCatSlug) {
    var currentCat = allCategories.value.find((c) => c.slug === currentCatSlug),
        currentCatId = currentCat.id;
    //landing组件
    store.commit("setPostMeta", {
        title: "分类：" + currentCat.name,
        time: "",
        bg: "",
    });
    //面包屑导航：递归查找父级分类，直到父级分类为0，即达到顶层分类
    ancestors.value = [];
    ancestors.value.push(currentCat);
    getParent(currentCat);
    store.commit("setBreadcrumbNav", ancestors.value);
    //TODO:wordpress api仅会返回当前分类下的post，不会返回后代分类的，需要递归查找当前分类所有后代分类传给wordpress api查询
    descendants.value = [];
    descendants.value.push(currentCatId);
    getNextLvCats(currentCatId);
    //查找当前分类下所有post
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postList({ categories: descendants.value.join(",") }).then(function (
        data
    ) {
        postList.value = [];
        generateList(allCategories.value, allTags.value, data.result);
    });
    renderTimes.value += 1;
};

watch(
    () => route.params["cat"],
    (n, o) => {
        if (renderTimes.value && n) {
            renderView(n);
        }
    }
);

onMounted(() => renderView(route.params["cat"]));
onUnmounted(() => store.commit("setBreadcrumbNav", []));
</script>

<template>
    <PostList :postList="postList"></PostList>
</template>
