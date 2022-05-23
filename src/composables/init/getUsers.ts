import { ref } from "vue";
import apis from "@/apis";
import { UserDetail } from "@/apis/apis";
/**
 * 加载user列表
 */
export default function () {
    const userList = ref<UserDetail[]>([]);
    const getUserList = async function () {
        var { result } = await apis.getUserList();
        userList.value = result;
    };
    return {
        userList,
        getUserList,
    };
}
