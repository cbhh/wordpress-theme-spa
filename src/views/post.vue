<script setup>
import {
    ref,
    getCurrentInstance,
    onMounted,
    computed,
    reactive,
    onUnmounted,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { PostDetail, UserDetail, ApiList } from "../apis/dataType";
import PostTagList from "../components/layout/content/PostTagList.vue";
import PostAuthor from "../components/layout/content/PostAuthor.vue";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const store = useStore();
const route = useRoute();

const postId = route.params["id"];

const allCategories = computed(() => {
    return store.state.categories.categoryList;
});
const allTags = computed(() => {
    return store.state.tags.tagList;
});

const contentHtml = ref(""),
    tagList = ref([]),
    breadcrumbCategoryList = ref([]),
    authorMeta = reactive({
        name: "",
        avatar: "",
        id: 0,
        description: "",
    });

onMounted(() => {
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postDetail(postId)
        .then(
            /**
             * @param {PostDetail} data
             */
            function (data) {
                contentHtml.value = data.content.rendered;
                store.commit("setPostMeta", {
                    title: data.title.rendered,
                    time: data.date,
                    bg: data.featured_image_url || "",
                });
                tagList.value = data.tags.map(function (t) {
                    var tagMeta = allTags.value.find((v) => v.id === t);
                    return {
                        id: t,
                        slug: tagMeta.slug,
                        name: tagMeta.name,
                    };
                });
                //如果有多个分类，则面包屑导航中只显示最后一个分类的祖先列表
                var lastCatId = data.categories[data.categories.length - 1],
                    lastCat = allCategories.value.find(
                        (c) => c.id === lastCatId
                    );
                breadcrumbCategoryList.value.unshift(lastCat);
                //递归查找父级分类，直到父级分类为0，即达到顶层分类
                const getParent = function (cat) {
                    var pid = cat["parent"];
                    if (pid > 0) {
                        var pnode = allCategories.value.find(
                            (c) => c.id === pid
                        );
                        breadcrumbCategoryList.value.unshift(pnode);
                        getParent(pnode);
                    }
                };
                getParent(lastCat);
                store.commit("setBreadcrumbNav", breadcrumbCategoryList.value);
                return data.author;
            }
        )
        .then(function (author) {
            $api.userDetail(author).then(
                /**
                 * @param {UserDetail} data
                 */
                function (data) {
                    authorMeta.avatar = data.avatar_urls["96"];
                    authorMeta.description = data.description;
                    authorMeta.id = data.id;
                    authorMeta.name = data.name;
                }
            );
        });
});
onUnmounted(() => {
    store.commit("setBreadcrumbNav", []);
});
</script>

<template>
    <article class="post">
        <div class="entry-content" v-html="contentHtml"></div>
        <footer class="entry-footer">
            <div class="extra-meta">
                <PostTagList :tagList="tagList"></PostTagList>
                <PostAuthor
                    :name="authorMeta.name"
                    :id="authorMeta.id"
                    :description="authorMeta.description"
                    :avatar="authorMeta.avatar"
                ></PostAuthor>
            </div>
            <div class="block-corner-deco">
                <span class="tl">❊</span>
                <span class="tr">❊</span>
                <span class="bl">❊</span>
                <span class="br">❊</span>
            </div>
        </footer>
    </article>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.post {
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid var(--theme-color-pale);
    box-shadow: var(--theme-shadow);
    text-align: left;
    line-height: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .entry-content {
        padding-bottom: 1px;
        margin-bottom: 1rem;
        img {
            box-shadow: 0 0 3px #000;
            cursor: pointer;
            max-width: 100%;
            height: auto;
        }
    }
    .entry-footer {
        border: 2px solid #b8860b;
        background: linear-gradient(
            135deg,
            rgba(222, 184, 135, 0.15) 5%,
            #fff,
            rgba(222, 184, 135, 0.15) 75%
        );
        border-radius: 5px;
        box-shadow: 0 0 3px var(--theme-color-gray);
        @include has-single-pseudo-el(after, "");
        &::after {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: url(@ass/32b2e170b4a43a09cff6d695df5a6d8e-Medium.png)
                no-repeat right;
            background-size: contain;
        }
        > .block-corner-deco {
            @include block-corner-deco(var(--theme-color-dark-red), 2px, 2px);
            line-height: 1;
            font-size: 0.5rem;
        }
        .extra-meta {
            margin: 10px 12px;
            position: relative;
            z-index: 1;
        }
    }
    @media (max-width: $media-small-size) {
        border: none;
    }
    @media (max-width: $media-mini-size) {
        padding: 10px;
    }
}
</style>
<style lang="scss">
.post {
    p code {
        margin: 0 3px;
        background: rgba(189, 159, 111, 0.2);
        padding: 2px 5px;
    }
    blockquote {
        position: relative;
        background: rgba(189, 159, 111, 0.1);
        padding: 3px 5px;
        text-align: right;
        margin-top: 2rem;
        margin-bottom: 2rem;
        > i {
            position: absolute;
            color: var(--theme-color);
            &.fa-quote-left {
                left: -1rem;
                top: -1rem;
            }
            &.fa-quote-right {
                right: -1rem;
                bottom: -1rem;
            }
        }
        > p {
            text-align: left;
        }
    }
    figure.aligncenter {
        > figcaption {
            text-align: center;
        }
    }
}
</style>
