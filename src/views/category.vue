<script setup>
import PostList from "../components/layout/content/PostList.vue";
import { getCurrentInstance, onMounted, ref, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ApiList } from "../apis/dataType";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const route = useRoute();
const store = useStore();

const allCategories = computed(() => {
    return store.state.categories.categoryList;
});
const allTags = computed(() => {
    return store.state.tags.tagList;
});

const currentCatSlug = route.params["cat"],
    postList = ref([]),
    catIdList = ref([]),
    breadcrumbCategoryList = ref([]);

onMounted(() => {
    var currentCat = allCategories.value.find((c) => c.slug === currentCatSlug),
        currentCatId = currentCat.id;
    catIdList.value.push(currentCatId);
    breadcrumbCategoryList.value.unshift(currentCat);
    //面包屑导航：递归查找父级分类，直到父级分类为0，即达到顶层分类
    const getParent = function (cat) {
        var pid = cat.parent;
        if (pid > 0) {
            var pnode = allCategories.value.find((c) => c.id === pid);
            breadcrumbCategoryList.value.unshift(pnode);
            getParent(pnode);
        }
    };
    getParent(currentCat);
    store.commit("setBreadcrumbNav", breadcrumbCategoryList.value);
    //landing组件
    store.commit("setPostMeta", {
        title: "分类：" + currentCat.name,
        time: "",
        bg: "",
    });
    //TODO:wordpress api仅会返回当前分类下的post，不会返回后代分类的，需要递归查找当前分类所有后代分类传给wordpress api查询
    const getDescendants = function (catId) {
        var nextLvNodes = allCategories.value.filter((c) => c.parent === catId);
        nextLvNodes.length &&
            nextLvNodes.forEach(function (n) {
                catIdList.value.push(n.id);
                getDescendants(n.id);
            });
    };
    getDescendants(currentCatId);
    /**
     * @type ApiList
     */
    var $api = $apis,
        catStr = catIdList.value.join(",");
    $api.postCategory(catStr).then(function (data) {
        var generateList = [];
        data.forEach(function (item) {
            var meta = {
                    id: item.id,
                    thumbnail: item.featured_image_url || "",
                    date: item.date,
                    title: item.title.rendered,
                    excerpt: item.excerpt.rendered,
                },
                category = item.categories.map(function (c) {
                    var catMeta = allCategories.value.find((v) => v.id === c);
                    return {
                        id: c,
                        slug: catMeta.slug,
                        name: catMeta.name,
                    };
                }),
                tag = item.tags.map(function (t) {
                    var tagMeta = allTags.value.find((v) => v.id === t);
                    return {
                        id: t,
                        slug: tagMeta.slug,
                        name: tagMeta.name,
                    };
                });
            meta["category"] = category;
            meta["tag"] = tag;
            generateList.push(meta);
        });
        postList.value = generateList;
    });
});
onUnmounted(() => {
    store.commit("setBreadcrumbNav", []);
});
</script>

<template>
    <PostList :postList="postList"></PostList>
</template>
