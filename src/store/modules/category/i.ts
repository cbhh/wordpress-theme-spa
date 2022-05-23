import { CategoryListItem } from "@/apis/apis";

export default interface CategoryModuleTypes {
    /**
     * 原始category数组
     */
    categoryList: CategoryListItem[];
    /**
     * 层次型category数组
     */
    hierarchicCategoryList: CategoryTree[];
}
/**
 * category树
 */
export interface CategoryTree {
    id: number;
    count: number;
    name: string;
    slug: string;
    children: CategoryTree[];
}
/**
 * 具有相同parent值的category树组合
 */
export interface SameParentNodeGroup {
    [parent: number]: CategoryTree[];
}
/**
 * 原始category数组item类型
 */
export type OriginCategoryListItem = CategoryListItem;