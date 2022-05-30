import TagListItem from "./tagListItem";
/**
 * 标签列表返回结果
 */
export default interface TagListResponse {
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
    result: TagListItem[];
}
