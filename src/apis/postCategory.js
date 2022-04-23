import appFetch from "../utils/fetch";

const postCategoryEndpoint = "posts?_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url&categories={cats}";

/**
 * 获取指定分类的文章列表
 */
export default appFetch(postCategoryEndpoint);