import UserListItem from "@/context/user-list/userListItem";

export default interface UserStateTypes {
    userList: UserListItem[];
}
/**
 * 原始User类型
 */
export type User = UserListItem;
