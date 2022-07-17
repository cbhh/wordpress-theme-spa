/* eslint-disable @typescript-eslint/naming-convention */
/**
 * （文章列表项中的）文章分类项
 */
export interface PostListItemCategoryItemType {
    /**
     * category id
     */
    id: number;
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
 * （提供给组件使用的）文章列表项
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
    id: number;
    name: string;
    /**
     * 是否启用分隔符
     */
    divider?: boolean;
}
/**
 *（文章详情中的）文章作者
 */
export interface PostDetailAuthorType {
    name: string;
    avatar: string;
    id: number;
    description: string;
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
     * 名称
     */
    name: string;
}
/**
 * landing组件类型
 */
export enum LandingType {
    home,
    post,
    archive
}
/**
 * sidebar组件位置
 */
export enum SidebarPosition {
    left,
    right,
}
/**
 * sidebaritem组件功能，不同功能需要添加不同class及style
 */
export enum SidebarItemFeature {
    /**
     * 最近文章
     */
    "recent-posts" = "recent-posts",
    /**
     * 标签云
     */
    "post-tag-cloud" = "post-tag-cloud",
    /**
     * 分类
     */
    "post-categories" = "post-categories",
    /**
     * 日历
     */
    "post-calendar" = "post-calendar",
    /**
     * 月度归档
     */
    "monthly-archives" = "monthly-archives",
}