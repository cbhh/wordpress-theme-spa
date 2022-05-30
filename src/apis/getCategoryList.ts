import appFetch from "@/utils/appFetch";
import wpAppConfig from "@wpAppConfig";
import CategoryListResponse from "@/context/category-list/categoryListResponse";

const baseEndpoint = `categories${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=id,count,name,slug,parent&per_page=100&hide_empty=${
    wpAppConfig.hideEmptyCategory
}`;

/**
 * 获取category列表
 */
export default async function () {
    return appFetch<CategoryListResponse>(baseEndpoint);
}
