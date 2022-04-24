import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const postTagEndpoint = `posts${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url&tags={tag}`;

/**
 * 获取指定标签的文章列表
 */
export default appFetch(postTagEndpoint);