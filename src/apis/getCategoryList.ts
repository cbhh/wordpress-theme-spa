import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";
import { CategoryListItem } from "./apis";

const categoryEndpoint = `categories${
    wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"
}_fields=id,count,name,slug,parent&per_page=100&hide_empty=${
    wpAppConfig.hideEmptyCategory
}`;

/**
 * 获取category列表
 */
export default appFetch<CategoryListItem[]>(categoryEndpoint);
