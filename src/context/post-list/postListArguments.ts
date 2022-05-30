/**
 * 文章列表查询参数
 */
export default interface PostListArguments {
    /**
     * 作者ID
     * @example 1
     */
    author?: number;
    /**
     * 起始日期
     * @example 2022-05-01
     */
    after?: string;
    /**
     * 结束日期
     * @example 2022-05-31
     */
    before?: string;
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
