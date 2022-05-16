import { ref } from "vue";
import apis from "@/apis";
import { TagListItem } from "@/apis/apis";
/**
 * 加载tag列表
 */
export default function () {
    const tagList = ref<TagListItem[]>([]);
    const getTagList = async function () {
        var { result } = await apis.getTagList();
        tagList.value = result;
    };
    return {
        tagList,
        getTagList,
    };
}
