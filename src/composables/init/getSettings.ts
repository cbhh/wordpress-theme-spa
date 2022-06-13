import { reactive } from "vue";
import { site } from "@wpAppConfig";
import getSiteSettings from "@/apis/getSiteSettings";
import { SiteMeta } from "@/context/common/provide-inject";

export default function () {
    const siteMeta = reactive<SiteMeta>({
        title: "",
        logo: site.logo,
        description: "",
        home: site.url,
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
