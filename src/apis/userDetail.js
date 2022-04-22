import appFetch from "../utils/fetch";

const userDetailEndpoint = "users/{id}?_fields=id,name,description,slug,avatar_urls";

/**
 * 获取单个用户
 */
export default appFetch(userDetailEndpoint);