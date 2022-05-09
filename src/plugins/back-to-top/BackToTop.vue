<script setup>
import { ref } from "vue";
const props = defineProps({
    visible: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const scrollInterval = 20;

const isMouseDown = ref(false);
const mouseDown = function () {
    isMouseDown.value = true;
};
const mouseUp = function () {
    isMouseDown.value = false;
};

const move = function () {
    var view = document.documentElement,
        totalScrollTop = view.scrollTop,
        managedScroll = window.innerHeight,
        totalScrollDuration = totalScrollTop / 5 / managedScroll,
        rate = totalScrollTop / ((totalScrollDuration * 1000) / scrollInterval);
    if (totalScrollTop < managedScroll) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    } else {
        var timer = setInterval(function () {
            if (view.scrollTop <= 0) {
                clearInterval(timer);
            } else {
                view.scrollTop -= rate;
            }
        }, scrollInterval);
    }
};
</script>

<template>
    <div
        class="back-to-top"
        :class="{ hidden: !props.visible, mousedown: isMouseDown }"
        @click="move"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
    >
        <div><i class="fa fa-arrow-up"></i></div>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.back-to-top {
    --side-length: 50px;
    position: fixed;
    bottom: 30px;
    right: $sidebar-width-percentage;
    width: var(--side-length);
    height: var(--side-length);
    border-radius: 50%;
    border: 1px solid var(--theme-color);
    background: #fff;
    font-size: 1.5rem;
    color: var(--theme-color);
    transition: var(--theme-transition);
    cursor: pointer;
    box-shadow: 0 0 10px #333;
    z-index: 1;
    > div {
        border-radius: inherit;
        width: calc(0.8 * var(--side-length));
        height: calc(0.8 * var(--side-length));
        line-height: calc(0.8 * var(--side-length) - 2px);
        box-sizing: border-box;
        background: url(@ass/7933259ae51d7b49d5291e7a1759d6f2.jpeg) repeat;
        background-size: contain;
        margin: calc(0.1 * var(--side-length));
        border: 1px solid transparent;
        transition: inherit;
    }
    &:hover > div {
        border-color: var(--theme-color);
    }
    &.mousedown > div {
        box-shadow: var(--theme-shadow);
    }
    &.hidden {
        bottom: 0;
        opacity: 0;
    }
    @media (max-width: $body-min-width-px) {
        --side-length: 45px;
    }
    @media (max-width: $media-small-size) {
        right: 10px;
        --side-length: 40px;
    }
    @media (max-width: $media-smallest-size) {
        --side-length: 35px;
    }
    @media (max-width: $media-minier-size) {
        --side-length: 30px;
    }
}
</style>
