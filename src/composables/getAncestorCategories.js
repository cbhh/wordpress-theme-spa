import { ref } from "vue";
import { CategoryListItem } from "../apis/dataType";
/**
 * 查找祖先分类
 * @param {Array<CategoryListItem>} allCategories
 */
export default function (allCategories) {
    const ancestors = ref([]);
    /**
     * 递归查找当前分类的父级分类，并将结果逐个存入ancestors数组（父级在前子级在后）
     * @param {CategoryListItem} cat 
     */
    const getParent = function (cat) {
        var pid = cat.parent;
        if (pid > 0) {
            var pnode = allCategories.find((c) => c.id === pid);
            ancestors.value.unshift(pnode);
            getParent(pnode);
        }
    };
    return {
        ancestors,
        getParent
    }
}