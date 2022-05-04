import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const baseEndpoint = `posts${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url`;

/**
 * 获取文章列表，可拼接query参数实现条件查询
 */
export default appFetch(baseEndpoint);