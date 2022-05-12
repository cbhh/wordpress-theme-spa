<script setup>
const props = defineProps({
    statusCurrent: {
        type: Boolean,
        required: false,
        default: false,
    },
    statusPre: {
        type: Boolean,
        required: false,
        default: false,
    },
    statusNext: {
        type: Boolean,
        required: false,
        default: false,
    },
    srcset: {
        type: String,
        required: false,
    },
    src: {
        type: String,
        required: true,
    },
    /**
     * 用来与文章中的对应image元素建立一对一的联系
     */
    imgLink: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        class="gallery-image-wrap"
        :class="{
            current: props.statusCurrent,
            pre: props.statusPre,
            next: props.statusNext,
        }"
        :data-img-link="props.imgLink"
    >
        <img class="gallery-image" :src="props.src" :srcset="props.srcset" />
    </div>
</template>

<style lang="scss" scoped>
.gallery-image-wrap {
    transition: var(--theme-transition);
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
