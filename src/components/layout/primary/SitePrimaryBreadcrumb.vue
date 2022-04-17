<script setup>
import { inject } from "vue";

const siteMeta = inject("site-meta");
</script>

<template>
    <div class="breadcrumb-area">
        <div class="breadcrumb-nav">
            <a :href="siteMeta.home"><i class="fa fa-home"></i>首页</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumb-area {
    position: relative;
    background: url(@ass/db8a37c82fe95b87a34e92b554178108-m.png) repeat;
    background-size: 25% auto;
    padding: 20px 0;
    width: calc(100% + 40px);
    right: 20px;
    z-index: 2;
    box-shadow: 0 1px 3px #000;
    > .breadcrumb-nav {
        margin: 0 50px;
        padding: 5px 10px;
        line-height: 20px;
        border: 2px solid var(--theme-color);
        box-sizing: border-box;
        box-shadow: 0 0 5px #333;
        background: #fff;
        font-family: var(--theme-font-compatible);
        > span {
            color: var(--theme-color-gray);
            margin: 0 5px;
            &:last-child {
                display: none;
            }
        }
        > a:first-child {
            > i {
                margin-right: 3px;
                color: var(--theme-color);
                transition: var(--theme-transition);
            }
        }
        a:hover {
            color: var(--theme-color-gray);
            > i {
                color: var(--theme-color-gray);
            }
        }
    }
    @media (max-width: $media-small-size) {
        width: 100%;
        left: 0;
        right: 0;
    }
    @media (max-width: $media-smaller-size) {
        background-size: 30%;
    }
    @media (max-width: $media-smallest-size) {
        background-size: 40%;
        > .breadcrumb-nav {
            margin: 0 40px;
        }
    }
    @media (max-width: $media-minier-size) {
        background-size: 50%;
        padding: 15px 0;
        > .breadcrumb-nav {
            margin: 0 20px;
        }
    }
}
</style>
