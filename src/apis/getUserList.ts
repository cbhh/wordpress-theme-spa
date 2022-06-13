import appFetch from "@/utils/appFetch";
import { api } from "@wpAppConfig";
import { UserListResponse } from "@/context/user-list/userListResponse";

const baseEndpoint = `users${
    api.backendPrettyUrlEnabled ? "?" : "&"
}_fields=id,name,description,slug,avatar_urls`;

/**
 * 获取用户列表
 */
export default async function () {
    return await appFetch<UserListResponse>(baseEndpoint);
}
