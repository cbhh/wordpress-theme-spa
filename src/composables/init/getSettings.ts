import { reactive } from "vue";
import wpAppConfig from "@wpAppConfig";
import apis from "@/apis";

export default function () {
    const siteMeta = reactive({
        title: "",
        logo: wpAppConfig.siteLogo,
        description: "",
        home: wpAppConfig.siteUrl,
    });
    const getSiteSettings = async function () {
        const { title, description } = await apis.getSiteSettings();
        siteMeta.title = title;
        siteMeta.description = description;
    };
    return {
        siteMeta,
        getSiteSettings,
    };
}
