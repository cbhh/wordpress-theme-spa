import { reactive } from "vue";
import setting from "../../apis/setting";
import wpAppConfig from "@wpAppConfig";

export default function () {
    const siteMeta = reactive({
        title: "",
        logo: wpAppConfig.siteLogo,
        description: "",
        home: wpAppConfig.siteUrl,
    });
    const getSiteSettings = async function () {
        const { title, description } = await setting();
        siteMeta.title = title;
        siteMeta.description = description;
    }
    return {
        siteMeta,
        getSiteSettings
    }
}