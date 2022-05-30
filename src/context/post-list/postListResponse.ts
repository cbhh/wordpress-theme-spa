import PostListItem from "./postListItem";
/**
 * 文章列表返回结果
 */
export default interface PostListResponse {
    /**
     * 项目总数
     */
    totalItems: number;
    /**
     * 总页数
     */
    totalPages: number;
    /**
     * 结果数据
     */
    result: PostListItem[];
}
