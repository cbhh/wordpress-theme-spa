<script setup>
import {
    ref,
    getCurrentInstance,
    onMounted,
    computed,
    reactive,
    onUnmounted,
    watch,
    nextTick,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ApiList } from "../apis/dataType";
import PostTagList from "../components/layout/content/PostTagList.vue";
import PostAuthor from "../components/layout/content/PostAuthor.vue";
import getAncestorCategories from "../composables/getAncestorCategories";
import generateCatalogData from "../composables/generateCatalogData";
import generateGalleryData from "../composables/generateGalleryData";
import windowScroll from "../global/windowScroll";

const $apis = getCurrentInstance().appContext.config.globalProperties.$apis;
const store = useStore();
const route = useRoute();

const allCategories = computed(() => store.state.categories.categoryList);
const allTags = computed(() => store.state.tags.tagList);
const allUsers = computed(() => store.state.users.userList);

const { ancestors, getParent } = getAncestorCategories(allCategories.value);
const {
    catalogList,
    catalogRequired,
    generateCatalogList,
    catalogVisible,
    setClickedCatalogItemStyle,
    switchCatalogVisible,
    switchCurrentCatalogItem
} = generateCatalogData();
const {
    galleryImageList,
    galleyRequired,
    galleryVisible,
    currentImageIndex,
    generateGalleryImageList,
    switchGalleyVisible,
    moveToNext,
    moveToPre,
} = generateGalleryData();

const renderTimes = ref(0),
    /**
     * content dom引用
     */
    content = ref(null),
    contentHtml = ref(""),
    tagList = ref([]),
    authorMeta = reactive({
        name: "",
        avatar: "",
        id: 0,
        description: "",
    });
/**
 * 提供数据渲染视图
 * @param {Number} curentPostId
 */
const renderView = function (curentPostId) {
    /**
     * @type ApiList
     */
    var $api = $apis;
    $api.postDetail(curentPostId)
        .then(function (data) {
            contentHtml.value = data.content.rendered;
            //landing组件
            store.commit("setPostMeta", {
                title: data.title.rendered,
                time: data.date,
                bg: data.featured_image_url || "",
            });
            //PostTagList组件
            tagList.value = data.tags.map(function (t) {
                var tagMeta = allTags.value.find((v) => v.id === t);
                return {
                    id: t,
                    slug: tagMeta.slug,
                    name: tagMeta.name,
                };
            });
            //面包屑导航：递归查找父级分类，直到父级分类为0，即达到顶层分类
            //如果有多个分类，则只显示最后一个分类
            var currentCatId = data.categories[data.categories.length - 1],
                currentCat = allCategories.value.find(
                    (c) => c.id === currentCatId
                );
            ancestors.value = [];
            ancestors.value.push(currentCat);
            getParent(currentCat);
            store.commit("setBreadcrumbNav", ancestors.value);
            //PostAuthor组件
            var currentAuthor = allUsers.value.find(
                (a) => a.id === data.author
            );
            authorMeta.avatar = currentAuthor.avatar_urls["96"];
            authorMeta.description = currentAuthor.description;
            authorMeta.id = currentAuthor.id;
            authorMeta.name = currentAuthor.name;

            renderTimes.value += 1;
        })
        .then(function () {
            nextTick().then(function () {
                //生成文章目录
                generateCatalogList(content.value);
                //生成文章图片画廊
                generateGalleryImageList(content.value);
            });
        });
};
//监听路由变化，加载不同文章
watch(
    () => route.params["pid"],
    (n) => {
        if (renderTimes.value && n) {
            renderView(n);
        }
    }
);

onMounted(() => {
    renderView(route.params["pid"]);
    //添加更新目录的窗口滚动事件处理器
    windowScroll.addHandle("catalog-move", null, switchCurrentCatalogItem);
});
onUnmounted(() => {
    store.commit("setBreadcrumbNav", []);
    //移除更新目录的窗口滚动事件处理器
    windowScroll.deleteHandle("catalog-move");
});
</script>

<template>
    <article class="post">
        <div class="entry-content" v-html="contentHtml" ref="content"></div>
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
    <post-catalog
        v-if="catalogRequired"
        :catalogItemList="catalogList"
        :visible="catalogVisible"
        @clickedItem="setClickedCatalogItemStyle"
    ></post-catalog>
    <catalog-switch-button
        :catalogVisible="catalogVisible"
        @switchButtonClicked="switchCatalogVisible"
    ></catalog-switch-button>
    <post-gallery
        v-if="galleyRequired"
        v-show="galleryVisible"
        :imageList="galleryImageList"
        :currentImageIndex="currentImageIndex"
        @closeGallery="switchGalleyVisible(false)"
        @moveNext="moveToNext"
        @movePre="moveToPre"
    ></post-gallery>
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
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.post {
    .entry-content {
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
        img {
            box-shadow: 0 0 3px #000;
            cursor: pointer;
            max-width: 100%;
            height: auto;
        }
        a {
            color: var(--theme-color);
        }
        a:hover {
            color: var(--theme-color-gray);
        }
    }
}
</style>
