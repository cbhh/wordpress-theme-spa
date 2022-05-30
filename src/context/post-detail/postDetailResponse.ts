/**
 * 文章详情返回结果
 */
export default interface PostDetailResponse {
    /**
     * 文章ID
     */
    id: number;
    /**
     * 发布日期
     */
    date: string;
    /**
     * 修改日期
     */
    modified: string;
    /**
     * 标题
     */
    title: { rendered: string };
    /**
     * 作者ID
     */
    author: number;
    /**
     * 特色图片ID
     */
    featured_media: number;
    /**
     * 分类ID数组
     */
    categories: number[];
    /**
     * 标签ID数组
     */
    tags: number[];
    /**
     * 特色图片URL，若不存在特色图片则返回false
     */
    featured_image_url: string | false;
    /**
     * 内容HTML字符串
     */
    content: { rendered: string };
}