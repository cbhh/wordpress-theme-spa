import appFetch from "../utils/fetch";
import wpAppConfig from "@wpAppConfig";

const postDateRangeOnlyDateEndpoint = `posts${wpAppConfig.apiBackendPrettyUrlEnabled ? "?" : "&"}_fields=id,date&after={start}T00:00:00&before={end}T23:59:59`;

/**
 * 获取指定日期范围内的文章日期列表（只包含文章日期，用于生成日历，非标准文章信息列表）
 */
export default appFetch(postDateRangeOnlyDateEndpoint);