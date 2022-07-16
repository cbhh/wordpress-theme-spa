<script
    setup
    lang="ts"
>
import { inject } from "vue";
import { RouterLink } from "vue-router";
import { injectKeySiteMeta } from "@/context/common/provide-inject";

const siteMeta = inject(injectKeySiteMeta);
</script>

<template>
    <div class="site-branding">
        <div class="site-logo">
            <img
                v-if="siteMeta && siteMeta.logo"
                :src="siteMeta && siteMeta.logo"
            >
        </div>
        <div class="site-title">
            <h1>
                <RouterLink :to="{ name: 'home' }">
                    {{ siteMeta && siteMeta.title }}
                </RouterLink>
            </h1>
        </div>
    </div>
</template>

<style
    lang="scss"
    scoped
>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.site-branding {
    img {
        max-height: $header-height * 0.8;
        @media (max-width: $media-minier-size) {
            max-height: $header-height * 0.6;
        }
    }
    > div {
        @include vertical-middle;
    }
    > .site-logo {
        margin-right: 5px;
    }
    > .site-title {
        padding: 5px 10px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
        border: 1px solid #666;
        transition: var(--theme-transition);
        font-family: var(--theme-font);
        > h1 {
            font-size: 1.2rem;
            > a {
                color: var(--theme-color-dark);
            }
        }
        &:hover {
            box-shadow: var(--theme-shadow);
        }
    }
}
</style>
