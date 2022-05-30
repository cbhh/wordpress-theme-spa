import appFetch from "@/utils/appFetch";
import wpAppConfig from "@wpAppConfig";
import PostDetailResponse from "@/context/post-detail/postDetailResponse";

// const postDetailEndpoint = `posts/{id}${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=author,id,content,title,categories,tags,date,modified,featured_media,featured_image_url`;

const baseEndpoint = [
    "posts/",
    `${
        wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
    }_fields=author,id,content,title,categories,tags,date,modified,featured_media,featured_image_url`,
];

/**
 * 获取单个文章
 * @param id
 */
export default async function (id: number) {
    return await appFetch<PostDetailResponse>(baseEndpoint.join(id + ""));
}
