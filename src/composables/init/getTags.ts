import { ref } from "vue";
import getTagList from "@/apis/getTagList";
import TagListItem from "@/context/tag-list/tagListItem";
/**
 * 加载tag列表
 */
export default function () {
    const tagList = ref<TagListItem[]>([]);
    const getTags = async function () {
        var res = await getTagList();
        if (res) {
            tagList.value = res.result;
        }
    };
    return {
        tagList,
        getTagList: getTags,
    };
}
