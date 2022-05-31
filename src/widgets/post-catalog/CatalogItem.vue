<script setup lang="ts">
import { computed } from "vue";
import { HeadingLevel } from "@/widgets/props";
interface T {
    headingIndex: number;
    text: string;
    headingLevel: HeadingLevel;
    href: string;
    isCurrent: boolean;
}
const props = withDefaults(defineProps<T>(), {
    headingIndex: 0,
    text: "",
    headingLevel: HeadingLevel.H2,
    href: "",
    isCurrent: false,
});
const levelClass = computed(() => "catalog-h" + props.headingLevel);
</script>

<template>
    <a
        class="catalog-item"
        :class="[props.isCurrent ? 'current' : '', levelClass]"
        :data-heading-anchor="props.headingIndex"
        :href="'#' + props.href"
    >
        <div class="catalog-item-wrap">
            <div class="item-deco" />
            <span class="item-text">{{ props.text }}</span>
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
