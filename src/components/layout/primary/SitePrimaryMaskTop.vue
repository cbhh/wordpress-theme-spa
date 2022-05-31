<script setup></script>

<template>
    <div class="primary-mask-top">
        <div />
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
        background: url(@ass/db8a37c82fe95b87a34e92b554178108-m.png) repeat-x;
        transform: rotateX(33deg);
        background-size: 18% auto;
        box-shadow: 0 -1px 3px #000;
    }
    @media (max-width: $media-small-size) {
        --offset-x: 4px;
        > div {
            background-size: 25% auto;
        }
    }
    @media (max-width: $media-smaller-size) {
        > div {
            background-size: 30%;
            transform: rotateX(45deg);
        }
    }
    @media (max-width: $media-smallest-size) {
        --offset-x: 3px;
        > div {
            background-size: 40%;
            height: 9px;
            top: -8px;
        }
    }
    @media (max-width: $media-mini-size) {
        --offset-x: 2px;
    }
    @media (max-width: $media-minier-size) {
        > div {
            background-size: 50%;
        }
    }
}
</style>
