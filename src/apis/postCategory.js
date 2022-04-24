import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const postCategoryEndpoint = `posts${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url&categories={cats}`;

/**
 * 获取指定分类的文章列表
 */
export default appFetch(postCategoryEndpoint);