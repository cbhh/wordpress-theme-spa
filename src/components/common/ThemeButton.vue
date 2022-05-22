<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";

interface T {
    /**
     * 是否需要背景
     */
    background?: boolean;
    /**
     * 是否为装饰按钮（无法点击交互）
     */
    decoration?: boolean;
    /**
     * 是否为圆形按钮
     */
    circle?: boolean;
}

const props = withDefaults(defineProps<T>(), {
    background: false,
    decoration: false,
    circle: false,
});
//此处模板引用参考：https://v3.cn.vuejs.org/guide/composition-api-template-refs.html#模板引用
const buttonBody = ref<HTMLDivElement>(),
    buttonHeight = ref(0),
    buttonHeightPx = computed(() => {
        return buttonHeight.value ? buttonHeight.value - 4 + "px" : "auto";
    });
onMounted(() => {
    //若设为圆形按钮，则在dom渲染完毕后根据按钮宽度计算按钮高度
    if (props.circle) {
        nextTick().then(() => {
            var el = buttonBody.value;
            buttonHeight.value = el ? el.getBoundingClientRect().width : 0;
        });
    }
});
</script>

<template>
    <button
        class="theme-button"
        :class="{ 'has-bg': props.background, circle: props.circle }"
        :disabled="props.decoration"
    >
        <div
            class="button-body"
            ref="buttonBody"
            :style="{ height: buttonHeightPx }"
        >
            <slot></slot>
        </div>
    </button>
</template>

<style lang="scss" scoped>
.theme-button {
    cursor: pointer;
    border: 1px solid var(--theme-color);
    box-sizing: content-box;
    background: #fff;
    transition: var(--theme-transition);
    > .button-body {
        color: var(--theme-color-dark);
        margin: 3px;
        padding: 2px 4px;
        border-radius: inherit;
        box-sizing: inherit;
    }
    &:hover {
        box-shadow: var(--theme-shadow);
    }
    &.has-bg {
        > .button-body {
            background: url(@ass/7933259ae51d7b49d5291e7a1759d6f2.jpeg) repeat;
            background-size: contain;
        }
    }
    &.circle {
        border-radius: 50%;
        > .button-body {
            display: flex;
            align-items: center;
        }
    }
    &[disabled] {
        cursor: not-allowed;
    }
}
</style>
