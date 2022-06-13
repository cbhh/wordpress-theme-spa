import appFetch from "@/utils/appFetch";
import { api, styleRuntime } from "@wpAppConfig";
import { CategoryListResponse } from "@/context/category-list/categoryListResponse";

const baseEndpoint = `categories${
    api.backendPrettyUrlEnabled ? "?" : "&"
}_fields=id,count,name,slug,parent&per_page=100&hide_empty=${
    styleRuntime.hideEmptyCategory
}`;

/**
 * 获取category列表
 */
export default async function () {
    return await appFetch<CategoryListResponse>(baseEndpoint);
}
