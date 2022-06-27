import CategoryListItem from "@/context/category-list/categoryListItem";
import { ref } from "vue";
/**
 * 递归查找当前分类的父级分类，并将结果逐个存入ancestors数组（父级在前子级在后）
 * @param cat
 */
function getPs (
    allCats: CategoryListItem[],
    ancestors: CategoryListItem[],
    cat: CategoryListItem
) {
    const pid = cat.parent;
    if (pid > 0) {
        const pnode = allCats.find((c) => c.id === pid);
        if (pnode) {
            ancestors.unshift(pnode);
            getPs(allCats, ancestors, pnode);
        }
    }
}
/**
 * 递归查找当前分类的后代分类id，并将结果逐个存入descendants数组（父级在前子级在后）
 * @param currentCatId
 */
function getNs (
    allCats: CategoryListItem[],
    descendants: number[],
    currentCatId: number
) {
    const nextLvNodes = allCats.filter((c) => c.parent === currentCatId);
    nextLvNodes.length &&
        nextLvNodes.forEach(function (n) {
            descendants.push(n.id);
            getNs(allCats, descendants, n.id);
        });
}

/**
 * 查找祖先/后代分类
 * @param allCategories
 */
export default function (allCategories: CategoryListItem[]) {
    const ancestors = ref<CategoryListItem[]>([]),
        descendants = ref<number[]>([]);
    /**
     * 查找当前分类的所有祖先分类
     * @param currentCat
     */
    const getAllAncestors = function (currentCat: CategoryListItem) {
        ancestors.value.splice(0);
        ancestors.value.push(currentCat);
        getPs(allCategories, ancestors.value, currentCat);
    };
    /**
     * 查找当前分类的所有后代分类id
     * @param currentCatId
     */
    const getAllDescendants = function (currentCatId: number) {
        descendants.value.splice(0);
        descendants.value.push(currentCatId);
        getNs(allCategories, descendants.value, currentCatId);
    };
    return {
        ancestors,
        descendants,
        getAllAncestors,
        getAllDescendants,
    };
}
