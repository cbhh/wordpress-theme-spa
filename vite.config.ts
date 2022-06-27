import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteExternalsPlugin } from "vite-plugin-externals";
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

const APP_VERSION = ["dev-0.3.5", "20220628"];

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createHtmlPlugin({
            minify: true,
            inject: {
                data: {
                    appVersionMeta: `<meta name="app-version" content=version:${APP_VERSION[0]},build:${APP_VERSION[1]}>`,
                    title: siteTitle,
                    injectMeta: generateSiteMeta(),
                    injectLink: generateSiteLink(),
                    injectStyle: generateBackgroundCss(),
                    injectScript: loadExternalDependencies(),
                    injectMoreScripts: loadMoreScripts(),
                },
            },
        }),
        viteExternalsPlugin(
            {
                vue: "Vue",
                pinia: "Pinia",
                "vue-router": "VueRouter",
            },
            {
                disableInServe: true,
            }
        ),
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "js/[hash].js",
                entryFileNames: "js/[hash].js",
                assetFileNames: "[ext]/[hash].[ext]",
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
