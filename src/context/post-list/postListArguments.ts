import { YearMonthDay } from "../common/date";
/**
 * 文章列表查询参数
 * @see [wordpress-rest-api-posts-args](https://developer.wordpress.org/rest-api/reference/posts/#arguments)
 */
export default interface PostListArguments {
    /**
     * 作者ID
     * @example 1
     */
    author?: number;
    /**
     * 起始日期
     * @example [2022,5,1]
     */
    start?: YearMonthDay;
    /**
     * 结束日期
     * @example [2022,6,1]
     */
    end?: YearMonthDay;
    /**
     * 分类列表
     * @example [1,2,3]
     */
    categories?: number[];
    /**
     * 标签列表
     * @example [1,2,3]
     */
    tags?: number[];
}
