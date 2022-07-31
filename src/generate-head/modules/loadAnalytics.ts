import { seo } from "../../../app.config.json";

const isPro = process.env.NODE_ENV === "production";

/**
 * 加载站点分析脚本
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
export default loadAnalyticScripts();
