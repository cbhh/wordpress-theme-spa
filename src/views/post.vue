<script setup>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { RouterLink, useRoute } from "vue-router";
import { PostDetail } from "../apis/dataType";

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
    breadcrumbCategoryList = ref([]);

onMounted(() => {
    $apis.postDetail(postId).then(
        /**
         * @param {PostDetail} data
         */
        function (data) {
        contentHtml.value = data.content.rendered;
    });
});
</script>

<template>
    <article class="post">
        <div class="entry-content" v-html="contentHtml"></div>
        <footer class="entry-footer">
            <div class="extra-meta">
                <div class="post-tag">
                    <i class="fa fa-tags"></i>
                </div>
                <div class="post-author">
                    <div class="author-avatar" title="作者：">
                        <a href=""></a>
                    </div>
                    <div class="author-profile">
                        <div aria-label="文章作者">
                            <span>作者：</span><a href=""></a>
                        </div>
                        <div></div>
                    </div>
                </div>
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
            ul,
            .post-tag,
            .post-author {
                display: flex;
                align-items: center;
            }
            a:hover {
                color: var(--theme-color-gray);
            }
            .post-tag {
                margin-bottom: 10px;
                > i {
                    color: var(--theme-color);
                    margin-right: 10px;
                }
                span {
                    color: var(--theme-color-gray);
                    margin: 0 5px;
                }
            }
            .author-avatar {
                margin-right: 10px;
                border-radius: 50%;
                transition: var(--theme-transition);
                a,
                img {
                    border-radius: inherit;
                }
                &:hover {
                    box-shadow: 0 0 3px #aaa;
                }
            }
            .author-profile > div:last-child {
                font-family: var(--theme-font-compatible);
            }
        }
        @media (max-width: $media-smallest-size) {
            .author-avatar img {
                width: 72px;
                height: 72px;
            }
        }
        @media (max-width: $media-minier-size) {
            .author-avatar img {
                width: 48px;
                height: 48px;
            }
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
