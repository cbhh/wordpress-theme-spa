import wpAppConfig from "@wpAppConfig";
import appFetch from "@/utils/appFetch";
import PostListArguments from "@/context/post-list/postListArguments";
import PostListResponse from "@/context/post-list/postListResponse";

const baseEndpoint = `posts${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=author,id,excerpt,title,categories,tags,date,featured_media,featured_image_url`;

/**
 * 获取文章列表
 * @param query 查询参数
 */
export default async function (query?: PostListArguments) {
    var ep = baseEndpoint;
    if (query) {
        if (query.after) {
            ep += `&after=${query.after}T00:00:00`;
        }
        if (query.before) {
            ep += `&before=${query.before}T23:59:59`;
        }
        if (query.author) {
            ep += `&author=${query.author}`;
        }
        if (query.categories) {
            ep += `&categories=${query.categories.join(",")}`;
        }
        if (query.tags) {
            ep += `&tags=${query.tags.join(",")}`;
        }
    }
    return await appFetch<PostListResponse>(ep);
}
