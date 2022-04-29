import { ref } from "vue";
import category from "../../apis/category";
/**
 * 加载category列表
 */
export default function () {
    const categoryList = ref([]);
    const getCategoryList = async function () {
        var { result } = await category();
        categoryList.value = result;
    }
    return {
        categoryList,
        getCategoryList
    }
}