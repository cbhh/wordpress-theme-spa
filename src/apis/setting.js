import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const settingEndpoint = `settings${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=title,description,site_logo`;

/**
 * 获取站点设置
 */
export default appFetch(settingEndpoint);