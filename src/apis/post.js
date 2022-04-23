import appFetch from "../utils/fetch";

const postEndpoint = "posts?_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url";

/**
 * 获取文章列表
 */
export default appFetch(postEndpoint);