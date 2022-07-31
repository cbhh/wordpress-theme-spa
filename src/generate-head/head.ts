import { seo } from "../../app.config.json";
import generateInlineCss from "./modules/generateInlineCss";
import generateLinks from "./modules/generateLinks";
import generateMetas from "./modules/generateMetas";
import loadAnalytics from "./modules/loadAnalytics";
import loadDeps from "./modules/loadDeps";

export default {
    title: seo.title,
    injectMeta: generateMetas,
    injectLink: generateLinks,
    injectStyle: generateInlineCss,
    injectScript: loadDeps,
    injectMoreScripts: loadAnalytics,
};
