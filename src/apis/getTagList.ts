import appFetch from "@/utils/appFetch";
import { api, styleRuntime } from "@wpAppConfig";
import { TagListResponse } from "@/context/tag-list/tagListResponse";

const baseEndpoint = `tags${
    api.backendPrettyUrlEnabled ? "?" : "&"
}_fields=id,count,name&hide_empty=${styleRuntime.hideEmptyTag}`;

/**
 * 获取tag列表
 */
export default async function () {
    return await appFetch<TagListResponse>(baseEndpoint);
}
