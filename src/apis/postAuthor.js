import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const postAuthorEndpoint = `posts${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url&author={author}`;

/**
 * 获取指定作者的文章列表
 */
export default appFetch(postAuthorEndpoint);