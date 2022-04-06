<script setup>
import ThemeButton from "./components/common/ThemeButton.vue";
import { ref } from "vue";

const clickTimes = ref(0);

function buttonClick() {
    clickTimes.value += 1;
}
</script>

<template>
    <ThemeButton text="主题按钮" bg circle @click="buttonClick"></ThemeButton>
    <div>点击次数：{{ clickTimes }}</div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
html,
body,
div,
a,
ul,
li,
button {
    margin: 0;
    padding: 0;
}
body {
    color: #333;
}
a {
    text-decoration: none;
    color: #333;
    transition: var(--theme-transition);
}
:root {
    --theme-font-compatible: Avenir, Tahoma, "Kai", "KaiTi", sans-serif;
    --theme-font: "Kai", "KaiTi", sans-serif;
    --theme-color-dark: #666;
    --theme-color-gray: #888;
    --theme-color: #bd9f6f;
    --theme-color-pale: #deb887;
    --theme-color-dark-red: #96655c;
    --theme-color-palest: #f7f1e5;
    --theme-transition: all 0.2s linear;
    --theme-shadow: 0 0 3px var(--theme-color);
    --theme-shadow-dark: 0 0 8px var(--theme-color-gray);
}
</style>
