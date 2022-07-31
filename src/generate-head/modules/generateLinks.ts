import { site, stylePre } from "../../../app.config.json";
import { dependencies } from "../../../package.json";
import getPackageVersion from "../getPackageVersion";

const isPro = process.env.NODE_ENV === "production";
const cdnPrefix = "https://cdn.staticfile.org/";
const prismCdnPrefix = `${cdnPrefix}prism/${getPackageVersion(
    dependencies.prismjs
)}/`;

function generateStyleLink (href: string, id: string, media?: string) {
    return `<link rel="stylesheet" id="${id}-css" href="${href}" type="text/css"${
        media ? " media='" + media + "'" : ""
    }>`;
}

function generateIconLink (rel: string, href: string, size?: string) {
    return `<link rel="${rel}" href="${href}" ${
        size ? " size='" + size + "'" : ""
    }>`;
}
/**
 * 生成link标签
 */
function generateSiteLink () {
    const linkArray = [];
    if (site.icon) {
        linkArray.push(
            generateIconLink("icon", site.icon, "32x32"),
            generateIconLink("icon", site.icon, "192x192"),
            generateIconLink("apple-touch-icon", site.icon)
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

export default generateSiteLink();
