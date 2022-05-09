<script setup>
import { computed, ref } from "vue";
const props = defineProps({
    catalogVisible: {
        type: Boolean,
        required: false,
        default: true,
    },
});
const emits = defineEmits(["switchButtonClicked"]);
const buttonTip = computed(() =>
    props.catalogVisible ? "隐藏目录" : "显示目录"
);
const isMouseDown = ref(false);
const mouseDown = function () {
    isMouseDown.value = true;
};
const mouseUp = function () {
    isMouseDown.value = false;
};
const clickSwitchButton = function () {
    emits("switchButtonClicked");
};
</script>

<template>
    <div
        class="post-catalog-switcher"
        :class="{
            'catalog-status-hidden': !props.catalogVisible,
            mousedown: isMouseDown,
        }"
        :title="buttonTip"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
        @click="clickSwitchButton"
    >
        <i class="fa fa-th-list"></i>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.post-catalog-switcher {
    position: fixed;
    bottom: 30px;
    left: $sidebar-width-percentage;
    background: #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 5px #333;
    color: var(--theme-color);
    cursor: pointer;
    transition: var(--theme-transition);
    border: 2px solid transparent;
    z-index: 10;
    &:hover {
        color: #fff;
        background: var(--theme-color);
    }
    &.catalog-status-hidden {
        &:hover {
            color: #fff;
        }
        color: var(--theme-color-gray);
    }
    &.mousedown {
        border-color: #eee;
    }
    @media (max-width: $media-small-size) {
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: var(--theme-shadow);
    }
}
</style>
