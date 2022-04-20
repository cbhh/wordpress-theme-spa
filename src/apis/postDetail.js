import appFetch from "../utils/fetch";

const postDetailEndpoint = "posts/{id}?_fields=author,id,content,title,categories,tags,date,modified,featured_media,featured_image_url";

/**
 * 获取单个文章
 * 返回数据格式：{"id":1,"date":"2022-01-27T09:49:30",
 * "modified":"2022-02-21T10:42:32","title":
 * {"rendered":"\uff01"},"content":
 * {"rendered":"\n<p>\uff01<\/p>\n","protected":false},
 * "author":1,"featured_media":0,"categories":[9],"tags":[11,13],
 * "featured_image_url":false|String}
 */
export default appFetch(postDetailEndpoint);