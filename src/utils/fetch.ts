import wpAppConfig from "@wpAppConfig";

const credential = window.btoa(wpAppConfig.apiUser + ":" + wpAppConfig.appPwd),
    mode = wpAppConfig.apiBaseUrl.startsWith(wpAppConfig.siteUrl)
        ? "same-origin"
        : "cors",
    restApiUrl =
        wpAppConfig.apiBaseUrl +
        (wpAppConfig.apiBackendPrettyUrlEnabled
            ? "/wp-json"
            : "/?rest_route=") +
        "/wp/v2/";
/**
 * 获取远程资源
 * @param baseEndpoint endpoint模板
 * @returns 创建promise的函数，可在该函数中传递参数来与baseEndpoint拼接，以生成最终需要的URL
 */
export default function <T>(baseEndpoint: string | string[]) {
    /**
     * 发送GET请求获取资源
     * @param param 传递给endpoint的参数列表：当baseEndpoint为数组时，需要传递数组参数或单个string/number以完成url拼接；当baseEndpoint为字符串时，需要传递kv键值对以生成url的查询参数
     */
    return async function (
        param?: string[] | string | number | { [key: string]: string }
    ) {
        var endpoint = combineUrl(baseEndpoint, param);
        if (endpoint) {
            var response = await fetch(restApiUrl + endpoint, {
                method: "GET",
                mode: mode,
                headers: {
                    Authorization: "Basic " + credential,
                },
            });
            if (response.ok) {
                var headers = response.headers,
                    totalItems =
                        headers.get("X-WP-Total") || headers.get("x-wp-total"),
                    totalPages =
                        headers.get("X-WP-TotalPages") ||
                        headers.get("x-wp-totalpages"),
                    result = await response.json();
                if (totalItems && totalPages) {
                    return {
                        totalItems: parseInt(totalItems),
                        totalPages: parseInt(totalPages),
                        result: result as T,
                    };
                } else return result as T;
            } else console.error("fetch data failed");
        } else console.error("invalid params");
    };
}

function combineUrl(
    baseEndpoint: string | string[],
    param?: string[] | string | number | { [key: string]: string }
) {
    //参数拼接，生成最终需要的URL
    //对于path中的变量，采用数组拼接方式，如posts/{id}
    //对于query中的变量，采用字符串拼接方式，如posts?{author}={1}&{cat}={1}
    if (typeof baseEndpoint === "string") {
        var endpoint1 = baseEndpoint;
        if (typeof param === "object" && !Array.isArray(param)) {
            for (var key in param) {
                endpoint1 += `&${key}=${param[key]}`;
            }
            return endpoint1;
        } else if (typeof param === "undefined") {
            return endpoint1;
        }
    } else if (Array.isArray(baseEndpoint)) {
        var endpoint2: (number | string)[] = [],
            blockCount = baseEndpoint.length,
            paramArray: (number | string)[] = [];
        if (typeof param === "string" || typeof param === "number") {
            paramArray.push(param);
        } else if (Array.isArray(param)) {
            paramArray = param;
        }
        if (paramArray[0]) {
            for (var i = 0; i < blockCount; i++) {
                endpoint2.push(baseEndpoint[i]);
                paramArray[i] && endpoint2.push(paramArray[i]);
            }
            return endpoint2.join("");
        }
    }
}
