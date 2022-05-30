/**
 * 标签列表项
 */
export default interface TagListItem {
    /**
     * 标签ID
     */
    id: number;
    /**
     * 拥有的post数量
     */
    count: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 别名
     */
    slug: string;
}