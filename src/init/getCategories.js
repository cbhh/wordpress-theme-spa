import { ref } from "vue";
import category from "../apis/category";
/**
 * 加载category列表
 */
export default function () {
    const categoryList = ref([]);
    const getCategoryList = async function () {
        categoryList.value = await category();
    }
    return {
        categoryList,
        getCategoryList
    }
}