import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import externalGlobals from "rollup-plugin-external-globals";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import wpAppConfig from "./wp-app.config";

/**
 * 生成站点元信息
 * @returns meta标签字符串
 */
function generateSiteMeta() {
	var metaArray = [];
	if (wpAppConfig.siteDescription) {
		metaArray.push(`<meta name="description" content="${wpAppConfig.siteDescription}"/>`);
	}
	return metaArray.join("");
}
/**
 * 生成站点link标签
 * @returns link标签字符串
 */
function generateSiteLink() {
	var linkArray = [];
	if (wpAppConfig.siteIcon) {
		linkArray.push(
			`<link rel="icon" href="${wpAppConfig.siteIcon}" sizes="32x32">`,
			`<link rel="icon" href="${wpAppConfig.siteIcon}" sizes="192x192">`, `<link rel="apple-touch-icon" href="${wpAppConfig.siteIcon}">`
		);
	}
	return linkArray.join("");
}
/**
 * 使用cdn加载依赖包
 * @returns script标签字符串
 */
function loadExternalDependencies() {
	if (process.env.NODE_ENV === "production") {
		var prefix = "<script src='https://cdn.staticfile.org/",
			suffix = ".global.prod.min.js'></script>";
		return [
			`${prefix}vue/3.2.25/vue.runtime${suffix}`,
			`${prefix}vue-router/4.0.14/vue-router${suffix}`,
			`${prefix}vuex/4.0.2/vuex${suffix}`
		].join("");
	} else return "";
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		createHtmlPlugin(
			{
				inject: {
					data: {
						title: wpAppConfig.siteTitle,
						injectMeta: generateSiteMeta(),
						injectLink: generateSiteLink(),
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
