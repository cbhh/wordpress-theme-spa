<script setup>
const props = defineProps({
    itemTitle: {
        type: String,
        required: true,
    },
    funcClass: {
        type: String,
        required: false,
        validator: function (cl) {
            return [
                "recent-posts",
                "post-tag-cloud",
                "post-categories",
                "post-calendar",
                "monthly-archives",
            ].includes(cl);
        },
    },
});
</script>

<template>
    <div class="sidebar-item" :class="props.funcClass">
        <div class="sidebar-item-wrap">
            <div class="sidebar-item-title">{{ props.itemTitle }}</div>
            <div class="sidebar-item-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";

$sidebar-item-title-height: 30px;
$sidebar-item-body-margin-v: 3px;

.sidebar-item {
    margin: $sidebar-edge-gap $sidebar-edge-gap 25px $sidebar-edge-gap;
    box-shadow: 0 0 3px #aaa;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    border: 1px solid #fff;
    .sidebar-item-wrap {
        border-radius: inherit;
        border: 1px solid var(--theme-color);
        margin: 2px;
        background: #fff;
        max-width: calc(100% - 6px);
    }
    .sidebar-item-title {
        background: #ece5d6;
        font-family: var(--theme-font);
        line-height: $sidebar-item-title-height;
        padding: 0 5px;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        z-index: 1;
        overflow: hidden;
        @include has-dual-same-pseudo-els("", -1);
        &::before {
            width: 30px;
            height: 30px;
            background: #ffe4c4;
            border-radius: 15px;
            top: 10px;
            left: calc(50% - 15px);
        }
        &::after {
            width: 100%;
            height: 30px;
            left: 0;
            top: 0;
            background: url(@ass/3584aea555db7ef041845aff44f33622-Large.png)
                no-repeat bottom;
            background-size: contain;
        }
    }
    .sidebar-item-body {
        //@include has-dual-same-pseudo-els("❊");
        line-height: 30px;
        margin: $sidebar-item-body-margin-v 5px;
        padding-bottom: 10px;
        height: calc(
            100% -
                ($sidebar-item-title-height + $sidebar-item-body-margin-v * 2)
        );
        // &::before,
        // &::after {
        //     color: var(--theme-color);
        //     font-size: 8px;
        //     bottom: -10px;
        // }
        // &::before {
        //     left: 0;
        // }
        // &::after {
        //     right: 0;
        // }
    }
    @media (max-width: 1100px) {
        .sidebar-item-title {
            font-size: 0.9rem;
        }
        .sidebar-item-body {
            font-size: 0.9rem;
        }
    }
    @media (max-width: $media-small-size) {
        margin: 0;
        flex: 1;
        &:not(:first-child):not(:last-child) {
            margin: 0 $sidebar-edge-gap;
        }
        &.monthly-archives {
            margin-left: $sidebar-edge-gap;
        }
    }
    @media (max-width: $media-minier-size) {
        min-width: 75%;
        &:not(:first-child):not(:last-child) {
            margin: $sidebar-edge-gap 0;
        }
        &.monthly-archives {
            margin-top: $sidebar-edge-gap;
            margin-left: 0;
        }
        &#post-catalog {
            min-width: auto;
        }
    }

    &.recent-posts {
        .sidebar-item-body li {
            @include hide-more-words;
        }
    }
    &.post-categories {
        .sidebar-item-body {
            text-align: left;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    &.monthly-archives {
        li {
            font-size: 14px;
            color: var(--theme-color-gray);
            > a {
                font-size: initial;
            }
        }
        @media (max-width: 1100px) {
            li,
            li a {
                font-size: 0.9rem;
            }
        }
    }
}
</style>
