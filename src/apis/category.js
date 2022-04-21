import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const categoryEndpoint = `categories?_fields=id,count,name,slug,parent&per_page=100&hide_empty=${wpAppConfig.hideEmptyCategory}`;

/**
 * 获取category列表，
 * 返回数据格式：[{"id":6,"count":0,"name":"cat","slug":"cat","parent":0}]
 */
export default appFetch(categoryEndpoint);