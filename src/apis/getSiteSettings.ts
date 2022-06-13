import appFetch from "@/utils/appFetch";
import { api } from "@wpAppConfig";
import SettingDetailResponse from "@/context/setting-detail/settingDetailResponse";

const baseEndpoint = `settings${
    api.backendPrettyUrlEnabled ? "?" : "&"
}_fields=title,description,site_logo`;

/**
 * 获取站点设置
 */
export default async function () {
    return await appFetch<SettingDetailResponse>(baseEndpoint);
}
