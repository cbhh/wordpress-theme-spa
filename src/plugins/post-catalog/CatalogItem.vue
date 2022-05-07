<script setup>
import { computed } from "vue";

const props = defineProps({
    /**
     * 目录项标题
     */
    itemText: {
        type: String,
        required: true,
    },
    /**
     * 对应的标题等级：2-6
     */
    itemLevel: {
        type: Number,
        required: true,
        validator: function (lv) {
            return [2, 3, 4, 5, 6].includes(lv);
        },
    },
    /**
     * 锚点字符串，用来与heading标签建立一对一的联系
     */
    itemAnchor: {
        type: String,
        required: true,
    },
    itemHref: {
        type: String,
        required: true,
    },
    /**
     * 是否当前选中章节
     */
    isCurrent: {
        type: Boolean,
        required: false,
        default: false,
    },
});
const emits = defineEmits(["itemClick"]);
const levelClass = computed(() => "catalog-h" + props.itemLevel);
/**
 * 点击任意一个目录项时，将其anchor值传递给父组件
 */
const catalogItemClick = function () {
    emits("itemClick", props.itemAnchor);
};
</script>

<template>
    <a
        class="catalog-item"
        :class="[props.isCurrent ? 'current' : '', levelClass]"
        :data-anchor="props.itemAnchor"
        :href="'#' + props.itemHref"
        @click="catalogItemClick"
    >
        <div class="catalog-item-wrap">
            <div class="item-deco"></div>
            <span class="item-text">{{ props.itemText }}</span>
        </div>
    </a>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
.catalog-item {
    display: block;
    margin-bottom: 10px;
    position: relative;
    padding: 3px 5px;
    text-align: left;
    > .catalog-item-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: var(--theme-transition);
        border-right: 2px solid transparent;
        @include has-single-pseudo-el(before, "❖");
        &::before {
            text-indent: initial;
            font-size: 12px;
            color: var(--theme-color-pale);
            left: -5px;
            z-index: 1;
        }
        > .item-deco {
            display: inline-block;
            height: 0;
            border-top: 1px dotted #cfcfcf;
            margin-right: 5px;
            @include has-single-pseudo-el(after, "");
            &::after {
                width: 4px;
                height: 4px;
                background: var(--theme-color-pale);
                border-radius: 2px;
                right: 0;
                top: -2.5px;
            }
        }
        > .item-text {
            @include hide-more-words;
        }
    }
    &:not(:last-child) {
        > .catalog-item-wrap::after {
            position: absolute;
            content: "";
            width: 1px;
            height: calc(100% + 10px);
            background: #efefef;
            left: -0.5px;
            top: 18px;
        }
    }
    &.current {
        > .catalog-item-wrap {
            border-right-color: var(--theme-color-dark-red);
            background: rgba(222, 184, 135, 0.15);
            color: var(--theme-color-dark-red);
            &::before {
                color: var(--theme-color-dark-red);
            }
            > .item-deco::after {
                background: var(--theme-color-dark-red);
            }
        }
    }
    &.catalog-h2 > .catalog-item-wrap {
        > .item-deco {
            width: 1rem;
        }
        > .item-text {
            max-width: calc(100% - 1rem);
            font-weight: bold;
        }
    }
    &.catalog-h3 > .catalog-item-wrap {
        > .item-deco {
            width: 2rem;
        }
        > .item-text {
            max-width: calc(100% - 2rem);
        }
    }
    &.catalog-h4 > .catalog-item-wrap {
        > .item-deco {
            width: 3rem;
        }
        > .item-text {
            max-width: calc(100% - 3rem);
            font-family: var(--theme-font);
        }
    }
    &.catalog-h5 > .catalog-item-wrap {
        > .item-deco {
            width: 4rem;
        }
        > .item-text {
            max-width: calc(100% - 4rem);
            font-family: var(--theme-font);
            font-size: 0.9rem;
        }
    }
    &.catalog-h6 > .catalog-item-wrap {
        > .item-deco {
            width: 5rem;
        }
        > .item-text {
            max-width: calc(100% - 5rem);
            font-family: var(--theme-font);
            font-size: 0.8rem;
        }
    }
}
</style>
