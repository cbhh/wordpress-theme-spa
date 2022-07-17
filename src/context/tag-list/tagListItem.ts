/**
 * 标签列表项
 * @see [wordpress-rest-api-tags-schema](https://developer.wordpress.org/rest-api/reference/tags/#schema)
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
}