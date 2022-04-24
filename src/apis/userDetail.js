import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const userDetailEndpoint = `users/{id}${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=id,name,description,slug,avatar_urls`;

/**
 * 获取单个用户
 */
export default appFetch(userDetailEndpoint);