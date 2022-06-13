<script
    setup
    lang="ts"
>
import { inject } from "vue";
import { footer } from "@wpAppConfig";
import { SiteMeta } from "@/context/common/provide-inject";

const siteMeta = inject("site-meta") as SiteMeta;

const footerContent = footer.needFiling
    ? `<a href="https://beian.miit.gov.cn/" target="_blank">${footer.footerContent}</a>`
    : footer.footerContent;
</script>

<template>
    <footer class="site-footer">
        <div class="footer-wrap">
            <div class="copyright">
                <span>&copy;</span><span>{{ new Date().getFullYear() }}</span><span>{{ siteMeta.title }}</span>
            </div>
            <div class="acknowledgements">
                <div class="ack-framework">
                    <span>Powered By</span><a
                        class="ack-wp"
                        href="https://wordpress.org"
                        target="_blank"
                        title="WordPress是一款能让您建立出色网站、博客或应用程序的开源软件"
                    >WordPress</a><span>+</span><a
                        class="ack-js"
                        href="https://vuejs.org/"
                        target="_blank"
                        title="Vue.js - The 渐进式 JavaScript 框架"
                    >Vue.js</a>
                </div>
                <div class="ack-separate">
                    ❊
                </div>
                <div class="ack-theme">
                    <a
                        href="https://github.com/cbhh/wordpress-theme-spa"
                        target="_blank"
                        title="复古中国风WordPress主题SPA版本"
                    >梦回长安</a><span>主题</span>
                </div>
            </div>
            <div
                class="extra-info"
                v-html="footerContent"
            />
        </div>
    </footer>
</template>

<style
    lang="scss"
    scoped
>
@import "@sty/mixin.scss";
@import "@sty/variable.scss";
.site-footer {
    position: absolute;
    width: $content-grid-width;
    bottom: 0;
    left: $sidebar-grid-width;
    background: url(@ass/db8a37c82fe95b87a34e92b554178108-m.png) repeat;
    background-size: 25% auto;
    padding: 20px 0;
    perspective-origin: top;
    perspective: 300px;
    transform-style: preserve-3d;
    --offset-x: 5px;
    &::before {
        position: absolute;
        content: "";
        top: -9px;
        height: 10px;
        left: var(--offset-x);
        width: calc(100% - 2 * var(--offset-x));
        background: url(@ass/db8a37c82fe95b87a34e92b554178108-m.png) repeat-x;
        background-size: inherit;
        transform: rotateX(33deg);
        box-shadow: 0 -1px 3px #000;
    }
    > .footer-wrap {
        display: inline-block;
        font-size: 0.9rem;
        padding: 10px;
        background: url(@ass/7933259ae51d7b49d5291e7a1759d6f2-Large-Medium.jpeg)
            left bottom no-repeat;
        background-size: cover;
        border: 2px solid var(--theme-color);
        box-shadow: 0 0 10px #333;
        a {
            color: var(--theme-color-dark);
            &:hover {
                color: #96655c;
            }
        }
    }
    @media (max-width: $media-small-size) {
        --offset-x: 4px;
        width: 100%;
        position: initial;
    }
    @media (max-width: $media-smaller-size) {
        --offset-x: 3px;
        background-size: 30%;
    }
    @media (max-width: $media-smallest-size) {
        padding: 15px 0;
        background-size: 40%;
        &::before {
            height: 9px;
            top: -8px;
            transform: rotateX(45deg);
        }
    }
    @media (max-width: $media-mini-size) {
        --offset-x: 2px;
    }
    @media (max-width: $media-minier-size) {
        padding: 10px 0;
        background-size: 50%;
    }
}
.footer-wrap {
    > .copyright {
        > span:not(:last-child) {
            margin-right: 5px;
        }
    }
    > .acknowledgements {
        margin: 6px 0;
        @include flex-center;
        > .ack-framework {
            > .ack-wp {
                margin: 0 5px;
            }
            > .ack-js {
                margin-left: 5px;
            }
        }
        > .ack-theme {
            > a {
                font-family: var(--theme-font);
                font-size: 1rem;
                margin-right: 5px;
            }
            > span {
                font-size: 0.6rem;
            }
        }
        > .ack-separate {
            margin: 0 8px;
            color: #96655c;
        }
    }
    > .extra-info {
        font-family: var(--theme-font);
    }
}
</style>
