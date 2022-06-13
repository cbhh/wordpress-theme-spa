import appFetch from "@/utils/appFetch";
import { api } from "@wpAppConfig";
import PostDetailResponse from "@/context/post-detail/postDetailResponse";

const baseEndpoint = [
    "posts/",
    `${
        api.backendPrettyUrlEnabled ? "?" : "&"
    }_fields=author,id,content,title,categories,tags,date,featured_media,featured_image_url`,
];

/**
 * 获取单个文章
 * @param id
 */
export default async function (id: number) {
    return await appFetch<PostDetailResponse>(baseEndpoint.join(id + ""));
}
