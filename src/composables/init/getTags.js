import { ref } from "vue";
import tag from "../../apis/tag";
/**
 * 加载tag列表
 */
export default function () {
    const tagList = ref([]);
    const getTagList = async function () {
        var { result } = await tag();
        tagList.value = result;
    }
    return {
        tagList,
        getTagList
    }
}

