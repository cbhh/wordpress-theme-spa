/**
 * （文章列表项中的）文章分类项
 */
export interface PostListItemCategoryItemType {
    /**
     * category id
     */
    id: number;
    /**
     * 别名
     */
    slug: string;
    /**
     * 名称
     */
    name: string;
}
/**
 * （文章列表项中的）文章标签项
 */
export interface PostListItemTagItemType {
    /**
     * tag id
     */
    id: number;
    /**
     * 别名
     */
    slug: string;
    /**
     * 名称
     */
    name: string;
}
/**
 * 文章作者
 */
export interface PostAuthorType {
    name: string;
    /**
     * 头像图片URL
     */
    avatar: string;
    id: number;
    description: string;
}
/**
 * 文章列表项
 */
export interface PostListItemType {
    /**
     * post id
     */
    id: number;
    /**
     * 特色图片URL
     */
    thumbnail: string;
    /**
     * 所属分类 数组
     */
    category: PostListItemCategoryItemType[];
    /**
     * 所属标签 数组
     */
    tag: PostListItemTagItemType[];
    /**
     * 日期
     */
    date: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 摘要
     */
    excerpt: string;
}
/**
 * （文章详情中的）文章标签项
 */
export interface PostDetailTagItemType {
    slug: string;
    name: string;
    /**
     * 是否启用分隔符
     */
    divider?: boolean;
}
/**
 * 面包屑（分类）导航项
 */
export interface BreadcrumbItemType {
    /**
     * category id
     */
    id: number;
    /**
     * 别名
     */
    slug: string;
    /**
     * 名称
     */
    name: string;
}
