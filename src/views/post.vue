<script
    setup
    lang="ts"
>
import { ref, onMounted, reactive, onUnmounted, watch, nextTick } from "vue";
import stores from "@/stores";
import { useRoute } from "vue-router";
import PostTagList from "@/components/layout/content/PostTagList.vue";
import PostAuthor from "@/components/layout/content/PostAuthor.vue";
import ThemeLoading from "@/components/common/ThemeLoading.vue";
import Catalog from "@/widgets/post-catalog/Catalog.vue";
import CatalogSwitchButton from "@/widgets/post-catalog/CatalogSwitchButton.vue";
import useCatalog from "@/widgets/post-catalog/useCatalog";
import Gallery from "@/widgets/post-gallery/Gallery.vue";
import useGallery from "@/widgets/post-gallery/useGallery";
import useCategoryQuery from "@/composables/useCategoryQuery";
import {
    PostDetailTagItemType,
    PostDetailAuthorType,
} from "@/components/props";
import getPostDetail from "@/apis/getPostDetail";
import Prism from "prismjs";

const route = useRoute(),
    {
        useTagStore,
        useCategoryStore,
        useUserStore,
        useBreadcrumbStore,
        usePageMetaStore,
    } = stores,
    tagStore = useTagStore(),
    categoryStore = useCategoryStore(),
    userStore = useUserStore(),
    breadcrumbStore = useBreadcrumbStore(),
    pageMetaStore = usePageMetaStore();

const { ancestors, getAllAncestors } = useCategoryQuery(
        categoryStore.categoryList
    ),
    {
        catalogList,
        catalogRequired,
        catalogVisible,
        generateCatalogList,
        setClickedCatalogItemStyle,
    } = useCatalog(),
    {
        galleryImageList,
        galleyRequired,
        galleryVisible,
        currentImageIndex,
        generateGalleryImageList,
    } = useGallery();
let renderTimes = 0;
/**
 * content dom引用
 */
const content = ref<HTMLDivElement>(),
    contentHtml = ref(""),
    tagList = ref<PostDetailTagItemType[]>([]),
    authorMeta = reactive<PostDetailAuthorType>({
        name: "",
        id: 0,
        description: "",
        avatar: "",
    }),
    loadingMaskRequired = ref(true),
    dataLoadingText = ref("");
/**
 * 提供数据渲染视图
 * @param currentPostId
 */
function renderView (currentPostId: number) {
    loadingMaskRequired.value = true;
    dataLoadingText.value = "正在加载文章数据";
    getPostDetail(currentPostId)
        .then(function (data) {
            if (data) {
                contentHtml.value = data.content.rendered;
                //landing组件
                pageMetaStore.storeBreadcrumbList({
                    title: data.title.rendered,
                    time: data.date,
                    background: data.featured_image_url || "",
                });
                //breadcrumb nav：递归查找父级分类，直到父级分类为0，即达到顶层分类
                //多个category时只选取最后一个
                const currentCatId =
                        data.categories[data.categories.length - 1],
                    currentCat =
                        categoryStore.getCategoryDetailById(currentCatId);
                if (currentCat) {
                    getAllAncestors(currentCat);
                    breadcrumbStore.storeBreadcrumbList(ancestors.value);
                }
                //PostTagList组件
                tagList.value = data.tags.map(function (t) {
                    const tagMeta = tagStore.getTagDetailById(t);
                    return {
                        id: t,
                        name: (tagMeta && tagMeta.name) || "",
                    };
                });
                //PostAuthor组件
                const currentAuthor = userStore.getUserDetailById(data.author);
                if (currentAuthor) {
                    authorMeta.avatar = currentAuthor.avatar_urls["96"];
                    authorMeta.description = currentAuthor.description;
                    authorMeta.id = currentAuthor.id;
                    authorMeta.name = currentAuthor.name;
                }
            }
            renderTimes += 1;
        })
        .then(function () {
            nextTick().then(function () {
                if (content.value) {
                    //生成文章目录
                    generateCatalogList(content.value);
                    //生成文章图片画廊
                    generateGalleryImageList(content.value);
                    //高亮语法
                    Prism.highlightAllUnder(content.value);
                }
                dataLoadingText.value = "文章数据加载成功";
                setTimeout(() => (loadingMaskRequired.value = false), 500);
            });
        });
}
//监听路由变化，加载不同文章
watch(
    () => route.params["pid"],
    (n) => {
        if (renderTimes && n) {
            renderView(parseInt(n.toString()));
        }
    }
);

onMounted(() => {
    renderView(parseInt(route.params["pid"].toString()));
    //添加更新目录的窗口滚动事件处理器
    //windowScroll.addHandle(catalogScroller, null, switchCurrentCatalogItem);
});
onUnmounted(() => {
    //移除更新目录的窗口滚动事件处理器
    //windowScroll.deleteHandle(catalogScroller);
    breadcrumbStore.storeBreadcrumbList([]);
});
</script>

<template>
    <article class="post">
        <div
            class="postLoadingMask"
            v-show="loadingMaskRequired"
        >
            <ThemeLoading
                :logo-required="false"
                :loading-text="dataLoadingText"
            />
        </div>
        <div
            class="entry-content"
            v-show="!loadingMaskRequired"
            v-html="contentHtml"
            ref="content"
        />
        <footer
            class="entry-footer"
            v-show="!loadingMaskRequired"
        >
            <div class="extra-meta">
                <PostTagList
                    v-if="tagList[0]"
                    :list="tagList"
                />
                <PostAuthor
                    :name="authorMeta.name"
                    :id="authorMeta.id"
                    :description="authorMeta.description"
                    :avatar="authorMeta.avatar"
                />
            </div>
            <div class="block-corner-deco">
                <span class="tl">❊</span>
                <span class="tr">❊</span>
                <span class="bl">❊</span>
                <span class="br">❊</span>
            </div>
        </footer>
    </article>
    <catalog
        v-if="catalogRequired"
        :list="catalogList"
        :visible="catalogVisible"
        @get-clicked-index="setClickedCatalogItemStyle"
    />
    <catalog-switch-button
        v-if="catalogRequired"
        v-model:catalogVisible="catalogVisible"
    />
    <gallery
        v-if="galleyRequired"
        :list="galleryImageList"
        v-model:visible="galleryVisible"
        v-model:currentImageIndex="currentImageIndex"
    />
</template>

<style
    lang="scss"
    scoped
>
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
    .postLoadingMask {
        @include flex-center;
        text-align: center;
    }
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
