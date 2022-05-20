import { UserDetail } from "@/apis/apis";

export default interface UserModuleTypes {
    userList: UserDetail[];
}
/**
 * 原始User类型
 */
export type User = UserDetail;
