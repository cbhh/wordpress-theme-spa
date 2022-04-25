<script setup>
import PostList from "../components/layout/content/PostList.vue";
import { getCurrentInstance, onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ApiList } from "../apis/dataType";
import generatePostList from "../composables/generatePostList";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const route = useRoute();
const store = useStore();

const allCategories = computed(() => store.state.categories.categoryList);
const allTags = computed(() => store.state.tags.tagList);
const allUsers = computed(() => store.state.users.userList);

const { postList, generateList } = generatePostList();

const renderTimes = ref(0);

const renderView = function (currentUserId) {
    var currentUser = allUsers.value.find((u) => u.id === currentUserId);
    //landing组件
    store.commit("setPostMeta", {
        title: "作者：" + currentUser.name,
        time: "",
        bg: "",
    });
    //查找当前作者下所有post
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postAuthor(currentUserId).then(function (data) {
        postList.value = [];
        generateList(allCategories.value, allTags.value, data);
    });
    renderTimes.value += 1;
};

watch(
    () => route.params["uid"],
    (n, o) => {
        if (renderTimes.value && n) {
            renderView(parseInt(n));
        }
    }
);

onMounted(() => {
    store.commit("setBreadcrumbNav", []);
    renderView(parseInt(route.params["uid"]));
});
</script>

<template>
    <PostList :postList="postList"></PostList>
</template>
