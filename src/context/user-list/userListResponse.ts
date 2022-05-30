import UserListItem from "./userListItem";
/**
 * 用户列表返回结果
 */
export default interface UserListResponse {
    /**
     * 项目总数
     */
    totalItems: number;
    /**
     * 总页数
     */
    totalPages: number;
    /**
     * 结果数据
     */
    result: UserListItem[];
}