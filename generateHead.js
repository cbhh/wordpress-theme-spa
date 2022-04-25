import wpAppConfig from "./wp-app.config";

const cdnPrefix = "https://cdn.staticfile.org/";

/**
 * 站点标题
 */
export const siteTitle = wpAppConfig.siteTitle;
/**
 * 生成站点元信息
 * @returns meta标签字符串
 */
export function generateSiteMeta() {
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
export function generateSiteLink() {
    var linkArray = [];
    if (wpAppConfig.siteIcon) {
        linkArray.push(
            `<link rel="icon" href="${wpAppConfig.siteIcon}" sizes="32x32">`,
            `<link rel="icon" href="${wpAppConfig.siteIcon}" sizes="192x192">`, `<link rel="apple-touch-icon" href="${wpAppConfig.siteIcon}">`
        );
    }
    //加载icon样式表
    if (process.env.NODE_ENV === "production") {
        linkArray.push(`<link rel='stylesheet' id='fontawesome-css' href='${cdnPrefix}font-awesome/4.7.0/css/font-awesome.min.css' type='text/css' media='all'>`);
    } else {
        linkArray.push("<link rel='stylesheet' id='fontawesome-css' href='/fontawesome/css/font-awesome.min.css' type='text/css' media='all'>");
    }
    //加载区块编辑器样式表
    if (wpAppConfig.enableGutenbergEditorStyle) {
        linkArray.push(`<link rel="stylesheet" id="wp-block-library-css" href="${wpAppConfig.apiBaseUrl}/wp-includes/css/dist/block-library/style.min.css" type="text/css" media="all">`);
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
            suffix = ".global.prod.min.js'></script>";
        return [
            `${prefix}vue/3.2.25/vue.runtime${suffix}`,
            `${prefix}vue-router/4.0.14/vue-router${suffix}`,
            `${prefix}vuex/4.0.2/vuex${suffix}`
        ].join("");
    } else return "";
}
/**
 * 生成背景图CSS
 * @returns style标签字符串
 */
export function generateBackgroundCss() {
    var settings = wpAppConfig.background,
        isXPosValid = ["left", "center", "right"].includes(settings.position.horizontal),
        isYPosValid = ["top", "center", "bottom"].includes(settings.position.vertical),
        isSizeValid = ["unset", "contain", "cover"].includes(settings.size);
    return `<style>body{background-image:url(${settings.image});background-position:${isXPosValid ? settings.position.horizontal : "unset"} ${isYPosValid ? settings.position.vertical : "unset"};background-size:${isSizeValid ? settings.size : "unset"};background-repeat:${settings.repeat ? "repeat" : "no-repeat"};background-attachment:${settings.scroll ? "scroll" : "fixed"}}</style>`;
}