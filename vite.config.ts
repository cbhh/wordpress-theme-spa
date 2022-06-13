import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import externalGlobals from "rollup-plugin-external-globals";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
import {
    siteTitle,
    generateSiteMeta,
    generateSiteLink,
    generateBackgroundCss,
    loadExternalDependencies,
    loadMoreScripts,
} from "./generateHead";

const appVersion = ["dev-0.3.1", "20220613"];

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    appVersionMeta: `<meta name="appVersion" content=version:${appVersion[0]},build:${appVersion[1]}>`,
                    title: siteTitle,
                    injectMeta: generateSiteMeta(),
                    injectLink: generateSiteLink(),
                    injectStyle: generateBackgroundCss(),
                    injectScript: loadExternalDependencies(),
                    injectMoreScripts: loadMoreScripts(),
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            external: ["vue", "pinia", "vue-router"],
            plugins: [
                externalGlobals({
                    vue: "Vue",
                    pinia: "Pinia",
                    "vue-router": "VueRouter",
                }),
            ],
            output: {
                chunkFileNames: "js/[hash].js",
                entryFileNames: "js/[hash].js",
                assetFileNames: "[ext]/[hash].[ext]"
            },
        },
        cssCodeSplit: false,
    },
    resolve: {
        alias: {
            "@": resolve("src"),
            "@sty": resolve("src/style"),
            "@wpAppConfig": resolve("./app.config.json"),
            "@ass": resolve("src/assets"),
        },
    },
});
