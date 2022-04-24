import { ref } from "vue";
import { CategoryListItem } from "../apis/dataType";
/**
 * 查找后代分类
 * @param {Array<CategoryListItem>} allCategories
 */
export default function (allCategories) {
    const descendants = ref([]);
    /**
     * 递归查找当前分类的后代分类id，并将结果逐个存入descendants数组（父级在前子级在后）
     * @param {Number} catId
     */
    const getNextLvCats = function (catId) {
        var nextLvNodes = allCategories.filter((c) => c.parent === catId);
        nextLvNodes.length &&
            nextLvNodes.forEach(function (n) {
                descendants.value.push(n.id);
                getNextLvCats(n.id);
            });
    };
    return {
        descendants,
        getNextLvCats
    }
}