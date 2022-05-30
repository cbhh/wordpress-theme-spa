/**
 * 文章列表项
 */
export default interface PostListItem {
    /**
     * 文章ID
     */
    id: number;
    /**
     * 创建日期
     */
    date: string;
    /**
     * 修改日期
     */
    modified: string;
    /**
     * 别名
     */
    slug: string;
    /**
     * 标题
     */
    title: { rendered: string };
    /**
     * 摘要
     */
    excerpt: {
        /**
         * HTML字符串
         */
        rendered: string;
        protected: boolean;
    };
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
}
