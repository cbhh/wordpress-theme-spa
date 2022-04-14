import appFetch from "../utils/fetch";

const postEndpoint = "posts?_fields=author,id,slug,excerpt,title,categories,tags,date,modified,featured_media,featured_image_url";

/**
 * 获取文章列表
 * 返回数据格式：[{"id":36,"date":"2022-03-07T13:35:30","modified":"2022-03-29T21:55:22","slug":"hello-world","title":{"rendered":"\u8d85"},"excerpt":{"rendered":"<p>\u8d85</p>\n","protected":false},"author":1,"featured_media":70,"categories":[17],"tags":[18],"featured_image_url":"659728d.jpg"}]
 */
export default appFetch(postEndpoint);