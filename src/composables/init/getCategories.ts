import { ref } from "vue";
import apis from "@/apis";
import { CategoryListItem } from "@/apis/apis";
/**
 * 加载category列表
 */
export default function () {
    const categoryList = ref<CategoryListItem[]>([]);
    const getCategoryList = async function () {
        var { result } = await apis.getCategoryList();
        categoryList.value = result;
    };
    return {
        categoryList,
        getCategoryList,
    };
}
