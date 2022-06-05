<script
    setup
    lang="ts"
>
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { onMounted, ref, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import stores from "@/stores";
import getAncestorCategories from "../composables/getAncestorCategories";
import getDescendantCategories from "../composables/getDescendantCategories";
import generatePostList from "../composables/generatePostList";
import getPostList from "@/apis/getPostList";

const route = useRoute(),
    { useTagStore, useCategoryStore, useBreadcrumbStore, usePageMetaStore } = stores,
    tagStore = useTagStore(),
    categoryStore = useCategoryStore(),
    breadcrumbStore = useBreadcrumbStore(),
    pageMetaStore = usePageMetaStore();

const { ancestors, getParent } = getAncestorCategories(
        categoryStore.categoryList
    ),
    { descendants, getNextLvCats } = getDescendantCategories(
        categoryStore.categoryList
    ),
    { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentCatSlug: string) {
    const currentCat = categoryStore.getCategoryDetailBySlug(currentCatSlug);
    if (currentCat) {
        const currentCatId = currentCat.id;
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载分类【${currentCat.name}】`;
        //landing组件
        pageMetaStore.storeBreadcrumbList({
            title: "分类：" + currentCat.name,
        });
        //breadcrumb nav：递归查找父级分类，直到父级分类为0，即达到顶层分类
        ancestors.value = [];
        ancestors.value.push(currentCat);
        getParent(currentCat);
        breadcrumbStore.storeBreadcrumbList(ancestors.value);
        //wordpress api仅会返回当前分类下的post，不会返回后代分类的，需要递归查找当前分类所有后代分类传给wordpress api查询
        descendants.value = [];
        descendants.value.push(currentCatId);
        getNextLvCats(currentCatId);
        //查找当前分类下所有post
        getPostList({ categories: descendants.value }).then(function (data) {
            if (data) {
                postList.value = [];
                generateList(
                    categoryStore.categoryList,
                    tagStore.tagList,
                    data.result
                );
                dataLoadingText.value = `分类【${
                    currentCat && currentCat.name
                }】加载成功`;
                setTimeout(() => (loadingMaskRequired.value = false), 500);
            }
        });
        renderTimes.value += 1;
    }
};

watch(
    () => route.params["cat"],
    (n) => {
        if (renderTimes.value && n) {
            renderView(n.toString());
        }
    }
);

onMounted(() => renderView(route.params["cat"].toString()));
onUnmounted(() => breadcrumbStore.storeBreadcrumbList([]));
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
