/**
 * 分类列表项
 */
export default interface CategoryListItem {
    /**
     * 分类ID
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
    /**
     * 父级分类ID
     */
    parent: number;
}
