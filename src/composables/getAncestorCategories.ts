import { ref } from "vue";
import CategoryListItem from "@/context/category-list/categoryListItem";
/**
 * 查找祖先分类
 * @param allCategories
 */
export default function (allCategories: CategoryListItem[]) {
    const ancestors = ref<CategoryListItem[]>([]);
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
    return {
        ancestors,
        getParent,
    };
}
