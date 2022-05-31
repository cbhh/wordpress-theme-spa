<script setup lang="ts">
import { computed, ref } from "vue";

interface T {
    catalogVisible: boolean;
}

const props = withDefaults(defineProps<T>(), {
    catalogVisible: true,
});
const emits = defineEmits<{ (e: "update:catalogVisible", v: boolean): void }>();
const buttonTip = computed(() =>
    props.catalogVisible ? "隐藏目录" : "显示目录"
);
const isMouseDown = ref(false);
const clickSwitchButton = function () {
    emits("update:catalogVisible", !props.catalogVisible);
};
</script>

<template>
    <Teleport to="body">
        <div
            class="post-catalog-switcher"
            :class="{
                'catalog-status-hidden': !props.catalogVisible,
                mousedown: isMouseDown,
            }"
            :title="buttonTip"
            @mousedown="isMouseDown = true"
            @mouseup="isMouseDown = false"
            @click="clickSwitchButton"
        >
            <i class="fa fa-th-list" />
        </div>
    </Teleport>
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
