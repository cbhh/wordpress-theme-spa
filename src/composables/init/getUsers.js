import { ref } from "vue";
import user from "../../apis/user";
/**
 * 加载user列表
 */
export default function () {
    const userList = ref([]);
    const getUserList = async function () {
        userList.value = await user();
    }
    return {
        userList,
        getUserList
    }
}