<script setup></script>

<template>
    <div class="primary-mask-top">
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.primary-mask-top {
    position: absolute;
    z-index: 1;
    width: 100%;
    perspective-origin: top;
    perspective: 300px;
    transform-style: preserve-3d;
    --offset-x: 6px;
    > div {
        position: absolute;
        content: "";
        top: -9px;
        left: var(--offset-x);
        width: calc(100% - 2 * var(--offset-x));
        height: 10px;
        background: url($primary-mask-background) repeat-x;
        transform: rotateX(33deg);
        background-size: 18% auto;
        box-shadow: 0 -1px 3px #000;
    }
}
</style>
