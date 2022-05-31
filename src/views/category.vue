<script setup lang="ts">
import PostList from "../components/layout/content/PostList.vue";
import ThemeLoading from "../components/common/ThemeLoading.vue";
import { onMounted, ref, computed, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { appUseStore } from "@/store";
import getAncestorCategories from "../composables/getAncestorCategories";
import getDescendantCategories from "../composables/getDescendantCategories";
import generatePostList from "../composables/generatePostList";
import getPostList from "@/apis/getPostList";

const route = useRoute(),
    store = appUseStore();

const allCategories = computed(() => store.state.categoryModule.categoryList),
    allTags = computed(() => store.state.tagModule.tagList);

const { ancestors, getParent } = getAncestorCategories(allCategories.value),
    { descendants, getNextLvCats } = getDescendantCategories(
        allCategories.value
    ),
    { postList, generateList } = generatePostList();

const renderTimes = ref(0),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");

const renderView = function (currentCatSlug: string) {
    const currentCat = allCategories.value.find((c) => c.slug === currentCatSlug);
    if (currentCat) {
        const currentCatId = currentCat.id;
        loadingMaskRequired.value = true;
        dataLoadingText.value = `正在加载分类【${currentCat.name}】`;
        //landing组件
        store.commit("pageMetaModule/setPageMeta", {
            title: "分类：" + currentCat.name,
            time: "",
            background: "",
        });
        //面包屑导航：递归查找父级分类，直到父级分类为0，即达到顶层分类
        ancestors.value = [];
        ancestors.value.push(currentCat);
        getParent(currentCat);
        store.commit("breadcrumbModule/setBreadcrumbNav", ancestors.value);
        //TODO:wordpress api仅会返回当前分类下的post，不会返回后代分类的，需要递归查找当前分类所有后代分类传给wordpress api查询
        descendants.value = [];
        descendants.value.push(currentCatId);
        getNextLvCats(currentCatId);
        //查找当前分类下所有post
        getPostList({ categories: descendants.value }).then(function (data) {
            if (data) {
                postList.value = [];
                generateList(allCategories.value, allTags.value, data.result);
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
onUnmounted(() => store.commit("breadcrumbModule/setBreadcrumbNav", []));
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
