import CategoryListItem from "./categoryListItem";
/**
 * 分类列表返回结果
 */
export default interface CategoryListResponse {
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
    result: CategoryListItem[];
}
