import appFetch from "../utils/fetch";

const settingEndpoint = "settings?_fields=title,description,site_logo";

/**
 * 获取站点设置
 */
export default appFetch(settingEndpoint);