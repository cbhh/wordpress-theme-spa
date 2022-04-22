<script setup>
import { RouterLink } from "vue-router";
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div class="post-author">
        <div class="author-avatar" title="作者：">
            <RouterLink :to="{ name: 'author', params: { id: props.id } }">
                <img :src="props.avatar" width="96" height="96" />
            </RouterLink>
        </div>
        <div class="author-profile">
            <div aria-label="文章作者">
                <span>作者：</span
                ><RouterLink :to="{ name: 'author', params: { id: props.id } }">
                    {{ props.name }}
                </RouterLink>
            </div>
            <div class="description">{{ props.description }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@sty/variable.scss";
.post-author {
    display: flex;
    align-items: center;
    a:hover {
        color: var(--theme-color-gray);
    }
    > .author-avatar {
        margin-right: 10px;
        border-radius: 50%;
        transition: var(--theme-transition);
        a,
        img {
            border-radius: inherit;
        }
        &:hover {
            box-shadow: 0 0 3px #aaa;
        }
        @media (max-width: $media-smallest-size) {
            img {
                width: 72px;
                height: 72px;
            }
        }
        @media (max-width: $media-minier-size) {
            img {
                width: 48px;
                height: 48px;
            }
        }
    }
    > .author-profile > .description {
        font-family: var(--theme-font-compatible);
    }
}
</style>
