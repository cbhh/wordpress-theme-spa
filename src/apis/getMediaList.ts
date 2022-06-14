import appFetch from "@/utils/appFetch";
import { api } from "@wpAppConfig";
import { MediaListResponse } from "@/context/media-list/mediaListResponse";

const baseEndpoint = `media${
    api.backendPrettyUrlEnabled ? "?" : "&"
}_fields=id,source_url`;

/**
 * 获取媒体列表
 * @param ids 媒体id数组
 */
export default async function (ids?: number[]) {
    let ep = baseEndpoint;
    if (ids) {
        if (ids.every((id) => id > 0)) {
            ep += `&include=${ids.join(",")}`;
        }
    }
    return await appFetch<MediaListResponse>(ep);
}
