import appFetch from "@/utils/appFetch";
import wpAppConfig from "@wpAppConfig";
import { UserListResponse } from "@/context/user-list/userListResponse";

const baseEndpoint = `users${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=id,name,description,slug,avatar_urls`;

/**
 * 获取用户列表
 */
export default async function () {
    return await appFetch<UserListResponse>(baseEndpoint);
}
