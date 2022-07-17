<script
    setup
    lang="ts"
>
import PostList from "../components/layout/content/PostList.vue";
import { onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import stores from "@/stores";
import useCategoryQuery from "@/composables/useCategoryQuery";
import usePostListGenerator from "@/composables/usePostListGenerator";
import getPostList from "@/apis/getPostList";

const route = useRoute(),
    { useCategoryStore, useBreadcrumbStore, usePageMetaStore } = stores,
    categoryStore = useCategoryStore(),
    breadcrumbStore = useBreadcrumbStore(),
    pageMetaStore = usePageMetaStore();

const { ancestors, descendants, getAllAncestors, getAllDescendants } =
        useCategoryQuery(categoryStore.categoryList),
    { postList, generateList } = usePostListGenerator();

let renderTimes = 0;

function renderView (currentCatId: number) {
    const currentCat = categoryStore.getCategoryDetailById(currentCatId);
    if (currentCat) {
        const currentCatId = currentCat.id;
        //landing组件
        pageMetaStore.storeBreadcrumbList({
            title: "分类：" + currentCat.name,
        });
        //breadcrumb nav：递归查找父级分类，直到父级分类为0，即达到顶层分类
        getAllAncestors(currentCat);
        breadcrumbStore.storeBreadcrumbList(ancestors.value);
        //wordpress api仅会返回当前分类下的post，不会返回后代分类的，需要递归查找当前分类所有后代分类传给wordpress api查询
        //查找当前分类下所有post
        getAllDescendants(currentCatId);
        getPostList({ categories: descendants.value }).then(function (data) {
            if (data) {
                generateList(data.result);
            }
        });
    } else {
        pageMetaStore.storeBreadcrumbList({
            title: "该分类已被移除",
        });
    }
    renderTimes += 1;
}

watch(
    () => route.params["cid"],
    (n) => {
        if (renderTimes && n) {
            renderView(parseInt(n.toString()));
        }
    }
);

onMounted(() => renderView(parseInt(route.params["cid"].toString())));
onUnmounted(() => breadcrumbStore.storeBreadcrumbList([]));
</script>

<template>
    <PostList :list="postList" />
</template>
