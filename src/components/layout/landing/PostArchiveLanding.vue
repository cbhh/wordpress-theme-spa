<script setup lang="ts">
import { appUseStore } from "@/store";
import { computed } from "vue";
import { convertDateFormat } from "@/utils/date";

const props = withDefaults(
    defineProps<{ landingType: "post" | "archive" | "" }>(),
    {
        landingType: "",
    }
);

const store = appUseStore();

const bg = computed(() => store.state.pageMetaModule.background),
    title = computed(() => store.state.pageMetaModule.title),
    time = computed(() => store.state.pageMetaModule.time);
const className = computed(() => {
    if (props.landingType === "post") return "post-landing";
    if (props.landingType === "archive") return "archive-landing";
    else return "";
});
</script>

<template>
    <div :class="className" :style="{ 'background-image': 'url(' + bg + ')' }">
        <div class="info">
            <h1>{{ title }}</h1>
            <div
                class="middle-separate-line"
                v-if="props.landingType === 'post'"
            >
                <div></div>
                <div>❊</div>
                <div></div>
            </div>
            <time :datetime="time" v-if="props.landingType === 'post'">
                {{ time ? convertDateFormat(time) : "" }}
            </time>
            <div class="block-corner-deco">
                <span class="tl">❊</span>
                <span class="tr">❊</span>
                <span class="bl">❊</span>
                <span class="br">❊</span>
            </div>
            <div class="block-edge-deco arc">
                <span class="t"></span>
                <span class="r"></span>
                <span class="b"></span>
                <span class="l"></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
