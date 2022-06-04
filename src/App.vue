<script
    setup
    lang="ts"
>
import stores from "./stores";
import { onMounted, ref, watch } from "vue";
import { useRouter, RouterView } from "vue-router";
import Category from "./components/layout/sidebar/modules/Category.vue";
import Tag from "./components/layout/sidebar/modules/Tag.vue";
import Layout from "./components/layout/layout.vue";

const { useCategoryStore, useTagStore } = stores,
    categoryStore = useCategoryStore(),
    tagStore = useTagStore(),
    router = useRouter();

const flag = ref(0);

watch(
    () => flag.value,
    (n, o) => {
        if (n === 2 && o < 2) {
            router.push({ name: "home" });
        }
    }
);

onMounted(() => {
    //调用state中的加载category列表action
    categoryStore.getCategorylist().then(() => {
        flag.value += 1;
    });
    //调用state中的加载tag列表action
    tagStore.getTagList().then(() => {
        flag.value += 1;
    });
});
</script>

<template>
    <Layout>
        <template #view>
            <RouterView />
        </template>
        <template #sidebar-category>
            <Category :list="categoryStore.hierarchicCategoryList" />
        </template>
        <template #sidebar-tag>
            <Tag :list="tagStore.tagList" />
        </template>
    </Layout>
</template>

<style lang="scss">
@import "@sty/main.scss";
@import "@sty/fix.scss";
@import "@sty/common.scss";
#app {
    position: relative;
}
</style>