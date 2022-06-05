import wpAppConfig from "./app.config";

const cdnPrefix = "https://cdn.staticfile.org/";

/**
 * 站点标题
 */
export const siteTitle = wpAppConfig.seo.title;
/**
 * 生成站点元信息
 * @returns meta标签字符串
 */
export function generateSiteMeta() {
    var metaArray = [],
        seoSettings = wpAppConfig.seo,
        sev = seoSettings.searchEngineValidate;
    if (seoSettings.description) {
        metaArray.push(
            `<meta name="description" content="${seoSettings.description}"/>`
        );
    }
    if (seoSettings.keywords) {
        metaArray.push(
            `<meta name="keywords" content="${seoSettings.keywords}"/>`
        );
    }
    if (sev.google) {
        metaArray.push(
            `<meta name="google-site-verification" content="${sev.google}"/>`
        );
    }
    if (sev.bing) {
        metaArray.push(`<meta name="msvalidate.01" content="${sev.bing}"/>`);
    }
    if (sev.baidu) {
        metaArray.push(
            `<meta name="baidu-site-verification" content="${sev.baidu}"/>`
        );
    }
    return metaArray.join("");
}
/**
 * 生成站点link标签
 * @returns link标签字符串
 */
export function generateSiteLink() {
    var linkArray = [];
    if (wpAppConfig.siteIcon) {
        linkArray.push(
            `<link rel="icon" href="${wpAppConfig.siteIcon}" sizes="32x32">`,
            `<link rel="icon" href="${wpAppConfig.siteIcon}" sizes="192x192">`,
            `<link rel="apple-touch-icon" href="${wpAppConfig.siteIcon}">`
        );
    }
    //加载icon样式表
    if (process.env.NODE_ENV === "production") {
        linkArray.push(
            `<link rel='stylesheet' id='fontawesome-css' href='${cdnPrefix}font-awesome/4.7.0/css/font-awesome.min.css' type='text/css' media='all'>`
        );
    } else {
        linkArray.push(
            "<link rel='stylesheet' id='fontawesome-css' href='/fontawesome/css/font-awesome.min.css' type='text/css' media='all'>"
        );
    }
    //加载区块编辑器样式表
    if (wpAppConfig.gutenbergEditorStylesheet) {
        linkArray.push(
            `<link rel="stylesheet" id="wp-block-library-css" href="${wpAppConfig.gutenbergEditorStylesheet}" type="text/css" media="all">`
        );
    }
    return linkArray.join("");
}
/**
 * 使用cdn加载依赖包
 * @returns script标签字符串
 */
export function loadExternalDependencies() {
    if (process.env.NODE_ENV === "production") {
        var prefix = `<script src='${cdnPrefix}`,
            suffix = ".min.js'></script>";
        return [
            `${prefix}vue/3.2.25/vue.runtime.global.prod${suffix}`,
            `${prefix}vue-router/4.0.14/vue-router.global.prod${suffix}`,
            `${prefix}vue-demi/0.13.1/index.iife${suffix}`,
            `${prefix}pinia/2.0.14/pinia.iife.prod${suffix}`,
        ].join("");
    } else return "";
}
/**
 * 生成背景图CSS
 * @returns style标签字符串
 */
export function generateBackgroundCss() {
    var settings = wpAppConfig.background,
        isXPosValid = ["left", "center", "right"].includes(
            settings.position.horizontal
        ),
        isYPosValid = ["top", "center", "bottom"].includes(
            settings.position.vertical
        ),
        isSizeValid = ["unset", "contain", "cover"].includes(settings.size);
    if (settings.image) {
        return `<style>body{background-image:url(${
            settings.image
        });background-position:${
            isXPosValid ? settings.position.horizontal : "unset"
        } ${
            isYPosValid ? settings.position.vertical : "unset"
        };background-size:${
            isSizeValid ? settings.size : "unset"
        };background-repeat:${
            settings.repeat ? "repeat" : "no-repeat"
        };background-attachment:${
            settings.scroll ? "scroll" : "fixed"
        }}</style>`;
    } else return "";
}
/**
 * 加载更多脚本
 * @returns script标签字符串
 */
export function loadMoreScripts() {
    if (process.env.NODE_ENV === "production") {
        var analytics = wpAppConfig.seo.siteAnalytics,
            array = [];
        for (var a in analytics) {
            array.push(analytics[a]);
        }
        return array.join("");
    } else {
        return "";
    }
}
