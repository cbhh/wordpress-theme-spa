import { ref } from "vue";
import getUserList from "@/apis/getUserList";
import UserListItem from "@/context/user-list/userListItem";
/**
 * 加载user列表
 */
export default function () {
    const userList = ref<UserListItem[]>([]);
    const getUsers = async function () {
        var res = await getUserList();
        if (res) {
            userList.value = res.result;
        }
    };
    return {
        userList,
        getUserList: getUsers,
    };
}
