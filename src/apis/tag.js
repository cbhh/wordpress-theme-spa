import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const tagEndpoint = `tags?_fields=id,count,name,slug&hide_empty=${wpAppConfig.hideEmptyTag}`;

/**
 * 获取tag列表
 * 返回数据格式：[{"id":18,"count":1,"name":"php","slug":"php"}]
 */
export default appFetch(tagEndpoint);