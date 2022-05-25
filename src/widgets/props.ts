export enum HeadingLevel {
    H1 = 1,
    H2,
    H3,
    H4,
    H5,
    H6,
}
/**
 * 目录项
 */
export interface CatalogItemType {
    /**
     * heading所处位置的index，用于标识所对应的heading元素
     */
    headingIndex: number;
    /**
     * 文本内容
     */
    text: string;
    /**
     * 对应heading元素等级1-6
     */
    headingLevel: HeadingLevel;
    /**
     * 超链接
     */
    href: string;
    /**
     * 是否当前选中
     */
    isCurrent: boolean;
}
/**
 * 画廊项
 */
export interface GalleryItemType {
    /**
     * 图片所处位置的index，用于标识article中所对应的img元素
     */
    imgIndex: number;
    /**
     * 是否当前选中
     */
    isCurrent: boolean;
    /**
     * 是否当前选中项的前一项
     */
    isCurrentPre: boolean;
    /**
     * 是否当前选中项的后一项
     */
    isCurrentNext: boolean;
    /**
     * 图片src
     */
    imgSrc: string;
    /**
     * 图片srcset
     */
    imgSrcset: string;
    /**
     * 图片描述，来自alt属性或最近的figcaption元素
     */
    description?: string;
}
