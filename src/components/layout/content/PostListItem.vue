<script setup>
import { RouterLink } from "vue-router";
import { convertDateFormat } from "../../../utils/date";
const props = defineProps({
    thumbnail: {
        type: String,
        required: false,
    },
    category: {
        type: Array,
        required: false,
    },
    tag: {
        type: Array,
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="post-item">
        <div class="post-item-wrap">
            <div class="post-thumbnail">
                <div
                    :style="{
                        'background-image': 'url(' + props.thumbnail + ')',
                    }"
                    :class="{ 'has-thumbnail': props.thumbnail }"
                >
                    <div class="post-meta">
                        <div class="post-category">
                            <i class="fa fa-folder-o"></i>
                            <ul class="post-categories">
                                <li v-for="cat in props.category" :key="cat.id">
                                    <RouterLink
                                        :to="{
                                            name: 'category',
                                            params: { cat: cat.slug },
                                        }"
                                    >
                                        {{ cat.name }}</RouterLink
                                    >
                                </li>
                            </ul>
                        </div>
                        <div class="post-tag">
                            <i class="fa fa-tag"></i>
                            <ul>
                                <li v-for="tag in props.tag" :key="tag.id">
                                    <RouterLink
                                        :to="{
                                            name: 'tag',
                                            params: { tag: tag.slug },
                                        }"
                                    >
                                        {{ tag.name }}
                                    </RouterLink>
                                </li>
                            </ul>
                        </div>
                        <div class="post-time">
                            <i class="fa fa-clock-o"></i
                            ><time :datetime="props.date">
                                {{ convertDateFormat(props.date) }}
                            </time>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-title">
                <span>❊</span
                ><RouterLink :to="{ name: 'post', params: { pid: props.id } }">{{
                    props.title
                }}</RouterLink
                ><span>❊</span>
            </div>
            <div class="post-excerpt" v-html="props.excerpt"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.post-item {
    padding: 2px;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 3px var(--theme-color);
    border-radius: 10px;
    @media (max-width: $media-mini-size) {
        margin-bottom: 20px;
    }
    @media (max-width: $media-minier-size) {
        margin-bottom: 15px;
    }
}
.post-item-wrap {
    padding: 7px;
    border: 2px solid var(--theme-color-pale);
    border-radius: inherit;
    > .post-thumbnail {
        z-index: 1;
        @include has-dual-same-pseudo-els("", -1);
        &::before,
        &::after {
            width: 100%;
            height: 100%;
            background-color: #ccc;
        }
        &::before {
            left: -4px;
            bottom: -4px;
        }
        &::after {
            left: 4px;
            bottom: 4px;
        }
        > .has-thumbnail {
            height: 200px;
            background-position: center;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
    }
    > .post-title {
        font-size: 1.25rem;
        margin: 10px;
        @include flex-center;
        > a {
            margin: 0 8px;
            &:hover {
                color: var(--theme-color-gray);
            }
        }
        > span {
            color: var(--theme-color-pale);
        }
    }
    > .post-excerpt {
        font-family: var(--theme-font-compatible);
        margin: 0 10px;
        color: #555;
        text-align: left;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        > p {
            overflow: inherit;
            text-overflow: inherit;
        }
    }
    @media (max-width: $media-mini-size) {
        > .post-thumbnail {
            > .has-thumbnail {
                height: 170px;
            }
            .post-meta {
                line-height: 20px;
            }
        }
    }
}
.post-meta {
    background: rgba(0, 0, 0, 0.4);
    line-height: 24px;
    color: #fff;
    padding: 6px 10px;
    > div {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        &:last-child {
            margin-bottom: 0;
        }
        > i {
            margin-right: 5px;
        }
    }
    ul {
        > li {
            position: relative;
            margin-right: 20px;
            float: left;
            &:not(:last-child)::after {
                position: absolute;
                content: "✦";
                width: 10px;
                font-size: 0.625rem;
                right: -15px;
                color: #ccc;
            }
            > a {
                color: #fff;
            }
        }
    }
    time {
        font-family: var(--theme-font);
    }
    a:hover {
        text-decoration: underline;
    }
    @media (max-width: $media-mini-size) {
        > div:not(:last-child) {
            margin-bottom: 6px;
        }
    }
}
</style>
