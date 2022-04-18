<script setup>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import { useStore } from "vuex";
import PostList from "../components/layout/content/PostList.vue";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const store = useStore();
const list = ref([]);

const allCategories = computed(() => {
    return store.state.categories.categoryList;
});
const allTags = computed(() => {
    return store.state.tags.tagList;
});

onMounted(() => {
    $apis.post().then(function (data) {
        /**
         * @type Array<{"id":Number,"date":String,"modified":String,"slug":String,"title":{"rendered":String},"excerpt":{"rendered":String,"protected":Boolean},"author":Number,"featured_media":Number,"categories":Array<Number>,"tags":Array<Number>,"featured_image_url":String|Boolean}>
         */
        const posts = data,
            generateList = [];
        posts.forEach(function (item) {
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
        list.value = generateList;
    });
});
</script>

<template>
    <PostList :postList="list"></PostList>
</template>

<style></style>
