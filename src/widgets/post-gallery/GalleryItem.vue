<script setup lang="ts">
interface T {
    imgIndex: number;
    isCurrent: boolean;
    isCurrentPre: boolean;
    isCurrentNext: boolean;
    imgSrc: string;
    imgSrcset: string;
}

const props = withDefaults(defineProps<T>(), {
    imgIndex: 0,
    isCurrent: false,
    isCurrentPre: false,
    isCurrentNext: false,
    imgSrc: "",
    imgSrcset: "",
});
</script>

<template>
    <div
        class="gallery-image-wrap"
        :class="{
            current: props.isCurrent,
            pre: props.isCurrentPre,
            next: props.isCurrentNext,
        }"
        :data-img-link="props.imgIndex"
    >
        <img
            class="gallery-image"
            :src="props.imgSrc"
            :srcset="props.imgSrcset"
        >
    </div>
</template>

<style lang="scss" scoped>
.gallery-image-wrap {
    transition: all 0.25s linear;
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    display: flex;
    align-items: center;
    &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.8);
    }
    > .gallery-image {
        max-height: 100%;
        max-width: 100%;
    }
    &.current {
        z-index: 1;
        &::after {
            display: none;
        }
        > .gallery-image {
            box-shadow: 0 0 3px #000;
            margin: 0 auto;
        }
    }
    &.pre {
        left: 3px;
        transform-origin: left;
        transform: scale(0.8);
        justify-content: flex-start;
    }
    &.next {
        right: 3px;
        transform-origin: right;
        transform: scale(0.8);
        justify-content: flex-end;
    }
    &:not(.current):not(.pre):not(.next) {
        display: none;
    }
}
</style>
