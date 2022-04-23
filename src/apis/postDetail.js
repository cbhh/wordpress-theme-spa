import appFetch from "../utils/fetch";

const postDetailEndpoint = "posts/{id}?_fields=author,id,content,title,categories,tags,date,modified,featured_media,featured_image_url";

/**
 * 获取单个文章
 */
export default appFetch(postDetailEndpoint);