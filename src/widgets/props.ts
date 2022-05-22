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
     * anchor值，用于标识所对应的heading元素
     */
    headingAnchor: string;
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
