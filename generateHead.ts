import { site, seo, stylePre } from "./app.config.json";
import { dependencies } from "./package.json";

const isPro = process.env.NODE_ENV === "production";
const cdnPrefix = "https://cdn.staticfile.org/";
const prismCdnPrefix = `${cdnPrefix}prism/${getPackageVersion(
    dependencies.prismjs
)}/`;
function getPackageVersion (npmVerStr: string) {
    return isNaN(parseInt(npmVerStr.charAt(0)))
        ? npmVerStr.substring(1)
        : npmVerStr;
}
function generateStyleLink (href: string, id: string, media?: string) {
    return `<link rel="stylesheet" id="${id}-css" href="${href}" type="text/css"${
        media ? " media='" + media + "'" : ""
    }>`;
}
function generateMeta (name: string, content: string) {
    return `<meta name="${name}" content="${content}"/>`;
}
/**
 * 生成站点元信息
 * @returns meta标签字符串
 */
function generateSiteMeta () {
    const metaArray: string[] = [],
        sev = seo.searchEngineValidate;
    if (seo.description) {
        metaArray.push(generateMeta("description", seo.description));
    }
    if (seo.keywords) {
        metaArray.push(generateMeta("keywords", seo.keywords));
    }
    if (sev.google) {
        metaArray.push(generateMeta("google-site-verification", sev.google));
    }
    if (sev.bing) {
        metaArray.push(generateMeta("msvalidate.01", sev.bing));
    }
    if (sev.baidu) {
        metaArray.push(generateMeta("baidu-site-verification", sev.baidu));
    }
    return metaArray.join("");
}
/**
 * 生成站点link标签
 * @returns link标签字符串
 */
function generateSiteLink () {
    const linkArray = [];
    if (site.icon) {
        linkArray.push(
            `<link rel="icon" href="${site.icon}" sizes="32x32">`,
            `<link rel="icon" href="${site.icon}" sizes="192x192">`,
            `<link rel="apple-touch-icon" href="${site.icon}">`
        );
    }
    //加载icon样式表
    if (isPro) {
        linkArray.push(
            generateStyleLink(
                `${cdnPrefix}font-awesome/4.7.0/css/font-awesome.min.css`,
                "fontawesome",
                "all"
            )
        );
    } else {
        linkArray.push(
            generateStyleLink(
                "/fontawesome/css/font-awesome.min.css",
                "fontawesome",
                "all"
            )
        );
    }
    //加载区块编辑器样式表
    if (stylePre.gutenbergEditorStylesheet) {
        linkArray.push(
            generateStyleLink(
                stylePre.gutenbergEditorStylesheet,
                "wp-block-library",
                "all"
            )
        );
    }
    //加载code hightlight样式表
    const theme = stylePre.codeHighlight.theme;
    if (theme.startsWith("http")) {
        //加载自定义theme样式表
        linkArray.push(generateStyleLink(theme, "prism-theme"));
    } else {
        //加载prism官方样式表
        const themeUrl = `${prismCdnPrefix}themes/prism${
            theme === "default" ? "" : "-" + theme
        }.min.css`;
        linkArray.push(generateStyleLink(themeUrl, "prism-theme"));
    }
    return linkArray.join("");
}
/**
 * 使用cdn加载依赖包
 * @returns script标签字符串
 */
function loadExternalDependencies () {
    if (isPro) {
        const prefix = `<script src='${cdnPrefix}`,
            suffix = ".min.js'></script>";
        const deps = [
            `${prefix}vue/${getPackageVersion(
                dependencies.vue
            )}/vue.runtime.global.prod${suffix}`,
            `${prefix}vue-router/${getPackageVersion(
                dependencies["vue-router"]
            )}/vue-router.global.prod${suffix}`,
            `${prefix}vue-demi/0.13.1/index.iife${suffix}`,
            `${prefix}pinia/${getPackageVersion(
                dependencies.pinia
            )}/pinia.iife.prod${suffix}`,
        ];
        const prism = stylePre.codeHighlight,
            prismVer = getPackageVersion(dependencies.prismjs);
        deps.push(`${prefix}prism/${prismVer}/components/prism-core${suffix}`);
        deps.push(
            `${prefix}prism/${prismVer}/plugins/autoloader/prism-autoloader${suffix}`
        );
        if (prism.showLineNumber) {
            deps.push(
                `${prefix}prism/${prismVer}/plugins/line-numbers/prism-line-numbers${suffix}`
            );
        }
        if (prism.showLanguage || prism.showCopyButton) {
            deps.push(
                `${prefix}prism/${prismVer}/plugins/toolbar/prism-toolbar${suffix}`
            );
            if (prism.showLanguage) {
                deps.push(
                    `${prefix}prism/${prismVer}/plugins/show-language/prism-show-language${suffix}`
                );
            }
            if (prism.showCopyButton) {
                deps.push(
                    `${prefix}prism/${prismVer}/plugins/copy-to-clipboard/prism-copy-to-clipboard${suffix}`
                );
            }
        }
        return deps.join("");
    } else {
        return "";
    }
}
/**
 * 生成内联CSS
 * @returns style标签字符串
 */
function generateInlineCss () {
    const styles: string[] = [];
    const settings = stylePre.background,
        isXPosValid = ["left", "center", "right"].includes(
            settings.position.horizontal
        ),
        isYPosValid = ["top", "center", "bottom"].includes(
            settings.position.vertical
        ),
        isSizeValid = ["unset", "contain", "cover"].includes(settings.size);
    if (settings.image) {
        styles.push(
            `<style>body{background-image:url(${
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
            }}</style>`
        );
    }
    const prism = stylePre.codeHighlight;
    if (prism.showLineNumber) {
        styles.push(
            "<style>pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.8em;text-align:right}</style>"
        );
    }
    if (prism.showLanguage || prism.showCopyButton) {
        styles.push(
            "<style>div.code-toolbar{position:relative}div.code-toolbar>.toolbar{position:absolute;z-index:10;top:.3em;right:.2em;transition:opacity .3s ease-in-out;opacity:0}div.code-toolbar:hover>.toolbar{opacity:1}div.code-toolbar:focus-within>.toolbar{opacity:1}div.code-toolbar>.toolbar>.toolbar-item{display:inline-block}div.code-toolbar>.toolbar>.toolbar-item>a{cursor:pointer}div.code-toolbar>.toolbar>.toolbar-item>button{background:0 0;border:0;color:inherit;font:inherit;line-height:normal;overflow:visible;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}div.code-toolbar>.toolbar>.toolbar-item>a,div.code-toolbar>.toolbar>.toolbar-item>button,div.code-toolbar>.toolbar>.toolbar-item>span{color:#bbb;font-size:.8em;padding:0 .5em;background:#f5f2f0;background:rgba(224,224,224,.2);box-shadow:0 2px 0 0 rgba(0,0,0,.2);border-radius:.5em}div.code-toolbar>.toolbar>.toolbar-item>a:focus,div.code-toolbar>.toolbar>.toolbar-item>a:hover,div.code-toolbar>.toolbar>.toolbar-item>button:focus,div.code-toolbar>.toolbar>.toolbar-item>button:hover,div.code-toolbar>.toolbar>.toolbar-item>span:focus,div.code-toolbar>.toolbar>.toolbar-item>span:hover{color:inherit;text-decoration:none}</style>"
        );
    }
    return styles.join("");
}
/**
 * 加载站点分析脚本
 * @returns script标签字符串
 */
function loadAnalyticScripts () {
    if (isPro) {
        const analytics = seo.siteAnalytics as Record<string, string>,
            array: string[] = [];
        for (const a in analytics) {
            array.push(analytics[a]);
        }
        return array.join("");
    } else {
        return "";
    }
}

export default {
    title: seo.title,
    injectMeta: generateSiteMeta(),
    injectLink: generateSiteLink(),
    injectStyle: generateInlineCss(),
    injectScript: loadExternalDependencies(),
    injectMoreScripts: loadAnalyticScripts(),
};
