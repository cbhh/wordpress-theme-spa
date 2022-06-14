/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 媒体列表项
 * @see [wordpress-rest-api-media-schema](https://developer.wordpress.org/rest-api/reference/media/#schema)
 */
export default interface MediaListItem {
    /**
     * 媒体ID
     */
    id: number;
    /**
     * 原始路径
     */
    source_url: string;
}