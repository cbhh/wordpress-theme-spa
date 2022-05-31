<script setup lang="ts">
import wpAppConfig from "@wpAppConfig";
import { computed } from "vue";

interface T {
    loadingText: string;
    logoRequired: boolean;
}

const props = withDefaults(defineProps<T>(), {
    loadingText: "正在加载",
    logoRequired: true,
});

const logoUrl = computed(() => wpAppConfig.siteLogo);
</script>

<template>
    <div class="theme-loading">
        <div class="loading-icon">
            <i class="fa fa-spinner fa-pulse fa-5x" />
        </div>
        <div class="loading-info">
            <img
                class="site-logo"
                v-if="props.logoRequired && logoUrl"
                :src="logoUrl"
            >
            <p class="loading-tip">
                {{ props.loadingText }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.theme-loading {
    display: flex;
    align-items: center;
    > .loading-icon {
        color: var(--theme-color-pale);
    }
    > .loading-info {
        margin-left: 10px;
        width: 150px;
        > .site-logo {
            max-width: 80px;
            max-height: 80px;
            margin: 0 auto 10px auto;
        }
    }
}
</style>
