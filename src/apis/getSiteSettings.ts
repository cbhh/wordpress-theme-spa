import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";
import { SettingDetail } from "./apis";

const settingEndpoint = `settings${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=title,description,site_logo`;

/**
 * 获取站点设置
 */
export default appFetch<SettingDetail>(settingEndpoint);
