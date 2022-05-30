import { ref } from "vue";
import CategoryListItem from "@/context/category-list/categoryListItem";
import getCategoryList from "@/apis/getCategoryList";
/**
 * 加载category列表
 */
export default function () {
    const categoryList = ref<CategoryListItem[]>([]);
    const getCats = async function () {
        var res = await getCategoryList();
        if (res) {
            categoryList.value = res.result;
        }
    };
    return {
        categoryList,
        getCategoryList: getCats,
    };
}
