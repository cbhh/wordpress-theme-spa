<script setup>
import SiteHeaderBranding from "./SiteHeaderBranding.vue";
</script>

<template>
    <header id="masthead">
        <SiteHeaderBranding />
    </header>
</template>

<style lang="scss" scoped>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
#masthead {
    box-sizing: border-box;
    width: 100%;
    height: $header-height;
    padding: 0 15px;
    @include flex-justify-center;
    background: var(--theme-color-palest);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    box-shadow: var(--theme-shadow-dark);
    transition: var(--theme-transition);
}
</style>
