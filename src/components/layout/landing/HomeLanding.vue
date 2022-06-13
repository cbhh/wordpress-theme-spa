<script
    setup
    lang="ts"
>
import { inject } from "vue";
import { SiteMeta } from "@/context/common/provide-inject";

const siteMeta = inject("site-meta") as SiteMeta;
</script>

<template>
    <div class="home-landing">
        <div class="landing-content">
            <div class="site-title">
                {{ siteMeta.title }}
            </div>
            <div class="middle-separate-line">
                <div />
                <div>✤</div>
                <div />
            </div>
            <div class="site-tagline">
                {{ siteMeta.description }}
            </div>
        </div>
    </div>
</template>

<style
    lang="scss"
    scoped
>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.home-landing {
    height: 100vh;
    @include column-flex-center;
    position: relative;
    background-size: cover;
    text-align: center;
    .landing-content {
        color: var(--theme-color-dark);
        margin-top: $header-height;
        .site-title {
            font: {
                size: 2.5rem;
                weight: bold;
            }
        }
        .middle-separate-line {
            @include middle-separate-line(
                var(--theme-color-pale),
                var(--theme-color)
            );
            margin: 5px 0;
        }
    }
    .social-links {
        margin: 50px 0 30px 0;
        padding: 5px 10px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        border: 1px solid #666;
        .social-links-list {
            display: flex;
            font-size: 1.2rem;
            line-height: 1;
            li:not(:last-child) {
                margin-right: 15px;
            }
            a:hover {
                color: var(--theme-color-pale);
            }
        }
    }
    .background-image-copyright {
        position: absolute;
        bottom: 40px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 3px 5px;
        border-radius: 5px;
        font-size: 0.9rem;
        a {
            color: var(--theme-color);
            &:hover {
                color: var(--theme-color-pale);
            }
        }
    }
}
</style>
