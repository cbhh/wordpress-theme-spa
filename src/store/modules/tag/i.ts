import { TagListItem } from "@/apis/apis";

export default interface TagModuleTypes {
    tagList: TagListItemWithSize[] | TagListItem[];
}
/**
 * 带有size属性的tag item
 */
export interface TagListItemWithSize extends TagListItem {
    /**
     * 标签文字尺寸，根据包含文章数量决定
     */
    size?: number;
}
/**
 * 带有map属性的tag item
 */
export interface TempTagListItem extends TagListItem {
    /**
     * 对原始data中对应元素位置的映射
     */
    map: number;
}
/**
 * 原始tag数组item类型
 */
export type OriginTagListItem = TagListItem;
