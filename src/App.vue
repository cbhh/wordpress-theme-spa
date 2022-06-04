<script
    setup
    lang="ts"
>
import { onMounted } from "vue";
import Category from "./components/layout/sidebar/modules/Category.vue";
import stores from "./stores";

const { useCategoryStore } = stores,
    categoryStore = useCategoryStore();
onMounted(() => {
    //调用state中的加载分类列表action
    categoryStore.getCategorylist().then(() => {
        //
    });
});
</script>

<template>
    <Category :list="categoryStore.hierarchicCategoryList" />
</template>
