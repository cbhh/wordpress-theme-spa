import { seo } from "../../../app.config.json";

function generateMeta (name: string, content: string) {
    return `<meta name="${name}" content="${content}"/>`;
}
/**
 * 生成meta标签
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

export default generateSiteMeta();
