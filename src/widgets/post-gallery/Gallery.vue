<script setup lang="ts">
import GalleryItem from "./GalleryItem.vue";
import { computed } from "vue";
import { GalleryItemType } from "../props";

interface T {
    /**
     * 图片列表
     */
    list: GalleryItemType[];
    /**
     * 当前图片在全部图片中的位置，从0开始
     */
    currentImageIndex: number;
    /**
     * 可见性
     */
    visible: boolean;
}

const props = withDefaults(defineProps<T>(), {
    list: () => [],
    currentImageIndex: 0,
    visible: false,
});

const emits = defineEmits<{
    (e: "update:visible", v: boolean): void;
    (e: "update:currentImageIndex", v: number): void;
}>();
const currentImageDescription = computed(() => {
        var data = props.list[props.currentImageIndex];
        return data ? data.description : "";
    }),
    imageCount = computed(() => props.list.length);
const clickCloseButton = function () {
    emits("update:visible", false);
};
const clickPre = function () {
    if (props.currentImageIndex > 0) {
        emits("update:currentImageIndex", props.currentImageIndex - 1);
    }
};
const clickNext = function () {
    if (props.currentImageIndex < imageCount.value - 1) {
        emits("update:currentImageIndex", props.currentImageIndex + 1);
    }
};
</script>

<template>
    <Teleport to="body">
        <div
            class="post-img-gallery"
            :class="{ hidden: !props.visible }"
        >
            <div
                class="gallery-close"
                title="退出画廊"
                @click="clickCloseButton"
            >
                <i class="fa fa-close" />
            </div>
            <div class="gallery-mover">
                <div
                    class="icon"
                    title="前一张"
                    @click="clickPre"
                >
                    <i class="fa fa-chevron-left" />
                </div>
            </div>
            <div class="gallery-content">
                <div class="current-img-index">
                    {{ props.currentImageIndex + 1 }}
                </div>
                <div class="img-container">
                    <GalleryItem
                        v-for="item in props.list"
                        :key="item.imgIndex"
                        :is-current="item.isCurrent"
                        :is-current-pre="item.isCurrentPre"
                        :is-current-next="item.isCurrentNext"
                        :img-src="item.imgSrc"
                        :img-srcset="item.imgSrcset"
                        :img-index="item.imgIndex"
                    />
                </div>
                <div class="current-img-description">
                    {{ currentImageDescription }}
                </div>
            </div>
            <div class="gallery-mover">
                <div
                    class="icon"
                    title="后一张"
                    @click="clickNext"
                >
                    <i class="fa fa-chevron-right" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.post-img-gallery {
    box-sizing: border-box;
    display: flex;
    height: 80%;
    left: 15%;
    position: fixed;
    top: 10%;
    width: 70%;
    z-index: 10;
    border: 2px solid var(--theme-color);
    box-shadow: 0 0 3px var(--theme-color);
    background: url(@ass/7933259ae51d7b49d5291e7a1759d6f2.jpeg) repeat;
    background-size: 5%;
    transition: all 0.3s linear;
    --mover-width: 50px;
    --close-side-length: 20px;
    &.hidden {
        transform: scale(0);
    }
    > .gallery-close {
        position: absolute;
        line-height: var(--close-side-length);
        width: var(--close-side-length);
        height: var(--close-side-length);
        right: 5px;
        top: 5px;
        padding: 3px;
        background: #fff;
        border-radius: 50%;
        color: var(--theme-color);
        border: 1px solid var(--theme-color);
        transition: var(--theme-transition);
        cursor: pointer;
        &:hover {
            background: var(--theme-color-gray);
            color: #fff;
            border-color: var(--theme-color-gray);
        }
    }
    > .gallery-mover {
        width: var(--mover-width);
        height: 100%;
        @include flex-center;
        > .icon {
            color: var(--theme-color);
            background: #fff;
            cursor: pointer;
            padding: 5px;
            transition: var(--theme-transition);
            border: 1px solid var(--theme-color);
            border-radius: 5px;
            &:hover {
                background: var(--theme-color-dark-red);
                color: #fff;
                border-color: var(--theme-color-dark-red);
            }
        }
    }
    > .gallery-content {
        height: 100%;
        width: calc(100% - 2 * var(--mover-width));
        font-family: var(--theme-font-compatible);
        > .img-container {
            height: calc(100% - 60px);
            box-sizing: border-box;
            padding: 3px;
            border: 1px solid var(--theme-color-dark-red);
            background: rgba(255, 255, 255, 0.5);
            position: relative;
            @include flex-center;
        }
        > .current-img-index,
        > .current-img-description {
            height: 30px;
            line-height: 30px;
        }
    }
    @media (max-width: $media-small-size) {
        width: 90%;
        left: 5%;
        --mover-width: 40px;
        --close-side-length: 16px;
    }
    @media (max-width: $media-mini-size) {
        --mover-width: 30px;
        --close-side-length: 12px;
    }
    @media (orientation: portrait) {
        height: 50%;
        top: 25%;
    }
}
</style>
