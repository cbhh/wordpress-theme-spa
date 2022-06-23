import { ref } from "vue";
import CategoryListItem from "@/context/category-list/categoryListItem";
/**
 * 查找祖先/后代分类
 * @param allCategories
 */
export default function (allCategories: CategoryListItem[]) {
    const ancestors = ref<CategoryListItem[]>([]);
    const descendants = ref<number[]>([]);
    /**
     * 递归查找当前分类的父级分类，并将结果逐个存入ancestors数组（父级在前子级在后）
     * @param cat
     */
    const getParent = function (cat: CategoryListItem) {
        const pid = cat.parent;
        if (pid > 0) {
            const pnode = allCategories.find((c) => c.id === pid);
            if (pnode) {
                ancestors.value.unshift(pnode);
                getParent(pnode);
            }
        }
    };
    /**
     * 递归查找当前分类的后代分类id，并将结果逐个存入descendants数组（父级在前子级在后）
     * @param catId
     */
    const getNextLvCats = function (catId: number) {
        const nextLvNodes = allCategories.filter((c) => c.parent === catId);
        nextLvNodes.length &&
            nextLvNodes.forEach(function (n) {
                descendants.value.push(n.id);
                getNextLvCats(n.id);
            });
    };
    return {
        ancestors,
        descendants,
        getParent,
        getNextLvCats,
    };
}
