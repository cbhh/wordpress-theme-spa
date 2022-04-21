<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    url: {
        type: String,
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
            <a :href="props.url">
                <img :src="props.avatar" />
            </a>
        </div>
        <div class="author-profile">
            <div aria-label="文章作者">
                <span>作者：</span><a :href="props.url">{{ props.name }}</a>
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
