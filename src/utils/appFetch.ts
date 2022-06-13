import { api, site } from "@wpAppConfig";

const credential = window.btoa(api.user + ":" + api.applicationPassword),
    mode = api.baseUrl.startsWith(site.url) ? "same-origin" : "cors",
    restApiUrl =
        api.baseUrl +
        (api.backendPrettyUrlEnabled ? "/wp-json" : "/?rest_route=") +
        "/wp/v2/";
/**
 * 发起get请求
 * @param endpoint
 */
export default async function <T> (endpoint: string): Promise<T | undefined> {
    const response = await fetch(restApiUrl + endpoint, {
        method: "GET",
        mode: mode,
        headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: "Basic " + credential,
        },
    });
    if (response.ok) {
        const headers = response.headers,
            totalItems = headers.get("X-WP-Total") || headers.get("x-wp-total"),
            totalPages =
                headers.get("X-WP-TotalPages") ||
                headers.get("x-wp-totalpages"),
            result = await response.json();
        if (totalItems && totalPages) {
            return {
                totalItems: parseInt(totalItems),
                totalPages: parseInt(totalPages),
                result: result,
            } as never;
        } else {
            return result;
        }
    } else {
        console.error("fetch data failed");
    }
}
