import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const userEndpoint = `users${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=id,name,description,slug,avatar_urls`;

/**
 * 获取用户列表
 */
export default appFetch(userEndpoint);