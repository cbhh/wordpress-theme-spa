<script
    setup
    lang="ts"
>
import stores from "@/stores";
import { computed } from "vue";
import { convertDateFormat } from "@/utils/date";
import { LandingType } from "@/components/props";

const props = withDefaults(
    defineProps<{
        landingType: LandingType;
    }>(),
    {
        landingType: LandingType.post,
    }
);

const { usePageMetaStore } = stores,
    pageMetaStore = usePageMetaStore();

const className = computed(() => {
    switch (props.landingType) {
    case LandingType.post:
        return "post-landing";
    case LandingType.archive:
        return "archive-landing";
    default:
        return "";
    }
});
</script>

<template>
    <div
        :class="className"
        :style="{ 'background-image': 'url(' + pageMetaStore.background + ')' }"
    >
        <div class="info">
            <h1>{{ pageMetaStore.title }}</h1>
            <div
                class="middle-separate-line"
                v-if="className === 'post-landing'"
            >
                <div />
                <div>❊</div>
                <div />
            </div>
            <time
                :datetime="pageMetaStore.time"
                v-if="className === 'post-landing'"
            >
                {{
                    pageMetaStore.time
                        ? convertDateFormat(pageMetaStore.time)
                        : ""
                }}
            </time>
            <div class="block-corner-deco">
                <span class="tl">❊</span>
                <span class="tr">❊</span>
                <span class="bl">❊</span>
                <span class="br">❊</span>
            </div>
            <div class="block-edge-deco arc">
                <span class="t" />
                <span class="r" />
                <span class="b" />
                <span class="l" />
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
.post-landing {
    background-position: center;
    background-size: cover;
    height: 300px;
    margin-top: $header-height;
    @include flex-center;
    > .info {
        padding: 10px 0;
        width: 60%;
        background: linear-gradient(
            to right,
            #fff 0%,
            rgba(255, 255, 255, 0.5) 50%,
            #fff 100%
        );
        box-sizing: border-box;
        border: 2px solid var(--theme-color-pale);
        box-shadow: var(--theme-shadow);
        border-radius: 10px;
        z-index: 1;
        @include has-single-pseudo-el(before, "");
        &::before {
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            left: -4px;
            top: -4px;
            background: rgba(255, 255, 255, 0.5);
            z-index: -1;
            border-radius: inherit;
        }
        > h1 {
            margin: 0 15px;
        }
        > .middle-separate-line {
            @include middle-separate-line(
                var(--theme-color-pale),
                var(--theme-color)
            );
        }
        > time {
            font-family: var(--theme-font);
            color: var(--theme-color-gray);
        }
        > .block-corner-deco {
            @include block-corner-deco(var(--theme-color), 4px, 0);
        }
        > .block-edge-deco {
            @include block-edge-deco(var(--theme-color));
        }
        @media (max-width: $media-small-size) {
            width: 80%;
        }
        @media (max-width: $media-smallest-size) {
            width: 90%;
        }
        @media (max-width: $media-mini-size) {
            width: 94%;
            border: none;
            background: rgba(255, 255, 255, 0.8);
            > h1 {
                margin: 0 10px;
            }
            > div,
            &::before {
                display: none;
            }
        }
    }
    @media (max-width: $media-small-size) {
        height: 200px;
    }
}
.archive-landing {
    @extend .post-landing;
    > .info > h1 {
        margin: 20px 15px;
        @include flex-center;
    }
}
</style>
