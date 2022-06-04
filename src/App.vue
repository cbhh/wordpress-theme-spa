<script
    setup
    lang="ts"
>
import { onMounted } from "vue";
import Category from "./components/layout/sidebar/modules/Category.vue";
import Tag from "./components/layout/sidebar/modules/Tag.vue";
import stores from "./stores";

const { useCategoryStore, useTagStore } = stores,
    categoryStore = useCategoryStore(),
    tagStore = useTagStore();
onMounted(() => {
    //调用state中的加载category列表action
    categoryStore.getCategorylist().then(() => {
        //
    });
    //调用state中的加载tag列表action
    tagStore.getTagList().then(() => {
        //
    });
});
</script>

<template>
    <Category :list="categoryStore.hierarchicCategoryList" />
    <Tag :list="tagStore.tagList" />
</template>
