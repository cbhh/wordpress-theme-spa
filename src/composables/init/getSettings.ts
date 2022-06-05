import { reactive } from "vue";
import wpAppConfig from "@wpAppConfig";
import getSiteSettings from "@/apis/getSiteSettings";

interface SiteMeta {
    title: string;
    logo: string;
    description: string;
    home: string;
}

export default function () {
    const siteMeta = reactive<SiteMeta>({
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
