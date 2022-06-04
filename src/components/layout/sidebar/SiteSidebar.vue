<script setup lang="ts">
import { computed } from "vue";
import ThemeButton from "@/components/common/ThemeButton.vue";
import { SidebarPosition } from "@/components/props";

interface T {
    position: SidebarPosition;
}

const props = withDefaults(defineProps<T>(), {
    position: SidebarPosition.left,
});

const sidebarClass = computed(() => {
    switch (props.position) {
    case SidebarPosition.left:
        return "site-sidebar-left";
    case SidebarPosition.right:
        return "site-sidebar-right";
    default:
        return "";
    }
});
</script>

<template>
    <aside
        class="site-sidebar"
        :class="sidebarClass"
    >
        <ThemeButton
            background
            decoration
            class="sidebar-top"
        >
            <slot name="top" />
        </ThemeButton>
        <div class="sidebar-body">
            <slot name="body" />
        </div>
        <div
            class="sidebar-bottom"
            v-if="sidebarClass === 'site-sidebar-left'"
        >
            <div class="deco-image">
                <div />
            </div>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
@import "@sty/keyframe.scss";
.site-sidebar {
    min-width: $sidebar-min-width-px;
    background-image: url(@ass/47ff0c21443ce5f94a6bee19199d0fbe-crop.jpeg);
    background-repeat: repeat;
    background-position: center;
    background-size: 75%;
    position: relative;
    &::after {
        position: absolute;
        height: 100%;
        width: 10px;
        top: -5px;
        background: url(@ass/db8a37c82fe95b87a34e92b554178108-c2.png) repeat-y;
        background-size: 20px;
        box-shadow: 0px 74px 3px #000;
    }
    $top-width-except: $sidebar-edge-gap * 2 + 2px;
    > .sidebar-top {
        margin: $sidebar-edge-gap;
        font-family: var(--theme-font);
        line-height: 25px;
        display: block;
        width: calc(100% - $top-width-except);
        font-size: inherit;
    }
    @media (max-width: $media-small-size) {
        margin: 25px;
        background-size: 20%;
        border: 2px solid var(--theme-color);
        border-radius: 10px;
        box-shadow: var(--theme-shadow);
        padding: $sidebar-edge-gap;
        > .sidebar-body {
            display: flex;
            align-items: flex-start;
            margin: 0 !important;
        }
        &::after,
        > .sidebar-top,
        > .sidebar-bottom {
            display: none;
        }
    }
    @media (max-width: $media-smallest-size) {
        background-size: 25%;
    }
    @media (max-width: $media-mini-size) {
        margin-left: 10px;
        margin-right: 10px;
    }
    @media (max-width: $media-minier-size) {
        background-size: 30%;
        > .sidebar-body {
            flex-direction: column;
            align-items: center;
        }
    }
}
.site-sidebar-left {
    &::after {
        left: 100%;
        transform: skewY(-45deg);
    }
    > .sidebar-body {
        margin-bottom: $sidebar-min-width-px + 20px;
    }
    > .sidebar-bottom {
        position: absolute;
        bottom: 10px;
        width: 100%;
        > .deco-image {
            width: $sidebar-min-width-px;
            height: $sidebar-min-width-px;
            border-radius: 50%;
            margin: 0 auto;
            box-shadow: 0 0 8px #aaa;
            overflow: hidden;
            > div {
                width: inherit;
                height: inherit;
                background: url(@ass/32b2e170b4a43a09cff6d695df5a6d8e-Medium.png)
                    no-repeat center;
                background-size: $sidebar-min-width-px;
                border-radius: inherit;
                background-color: rgba(255, 255, 255, 0.8);
                animation: animation-rotate 20s linear infinite;
            }
        }
    }
}
.site-sidebar-right {
    &::after {
        right: 100%;
        transform: skewY(45deg);
    }
    @media (max-width: $media-small-size) {
        margin-top: 0;
    }
}
</style>
