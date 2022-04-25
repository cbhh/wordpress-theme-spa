import { ref } from "vue";
import tag from "../../apis/tag";
/**
 * 加载tag列表
 */
export default function () {
    const tagList = ref([]);
    const getTagList = async function () {
        tagList.value = await tag();
    }
    return {
        tagList,
        getTagList
    }
}

