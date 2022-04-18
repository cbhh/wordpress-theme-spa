import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import externalGlobals from "rollup-plugin-external-globals";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { siteTitle, generateSiteMeta, generateSiteLink, generateBackgroundCss, loadExternalDependencies } from "./generateHead";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createHtmlPlugin(
			{
				inject: {
					data: {
						title: siteTitle,
						injectMeta: generateSiteMeta(),
						injectLink: generateSiteLink(),
						injectStyle: generateBackgroundCss(),
						injectScript: loadExternalDependencies(),
					}
				}
			}
		)],
	build: {
		rollupOptions: {
			external: ["vue", "vuex", "vue-router"],
			plugins: [
				externalGlobals({
					vue: "Vue",
					vuex: "Vuex",
					"vue-router": "VueRouter",
				}),
			],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve("src"),
			"@sty": path.resolve("src/style"),
			"@wpAppConfig": path.resolve("./wp-app.config.js"),
			"@ass": path.resolve("src/assets")
		}
	}
})
