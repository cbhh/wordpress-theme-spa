import { reactive } from "vue";
import wpAppConfig from "@wpAppConfig";
import getSiteSettings from "@/apis/getSiteSettings";

export default function () {
    const siteMeta = reactive({
        title: "",
        logo: wpAppConfig.siteLogo,
        description: "",
        home: wpAppConfig.siteUrl,
    });
    const getSettings = async function () {
        const res = await getSiteSettings();
        if (res) {
            siteMeta.title = res.title;
            siteMeta.description = res.description;
        }
    };
    return {
        siteMeta,
        getSiteSettings: getSettings,
    };
}
