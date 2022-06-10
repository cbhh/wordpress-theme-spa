/**
 * 基础列表返回结果
 */
export default interface BaseListResponse<T> {
    /**
     * 项目总数
     */
    totalItems: number;
    /**
     * 总页数
     */
    totalPages: number;
    /**
     * 数据结果
     */
    result: T[];
}
