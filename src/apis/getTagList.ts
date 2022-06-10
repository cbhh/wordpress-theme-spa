import appFetch from "@/utils/appFetch";
import wpAppConfig from "@wpAppConfig";
import { TagListResponse } from "@/context/tag-list/tagListResponse";

const baseEndpoint = `tags${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=id,count,name,slug&hide_empty=${wpAppConfig.hideEmptyTag}`;

/**
 * 获取tag列表
 */
export default async function () {
    return await appFetch<TagListResponse>(baseEndpoint);
}
