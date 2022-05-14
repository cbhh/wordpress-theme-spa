import wpAppConfig from "@wpAppConfig";

const credential = window.btoa(wpAppConfig.apiUser + ":" + wpAppConfig.appPwd),
    mode = wpAppConfig.apiBaseUrl.startsWith(wpAppConfig.siteUrl) ? "same-origin" : "cors",
    restApiUrl = wpAppConfig.apiBaseUrl + (wpAppConfig.apiBackendPrettyUrlEnabled ? "/wp-json" : "/?rest_route=") + "/wp/v2/";
/**
 * 获取远程资源
 * @param {String|Array<String>} baseEndpoint
 * @returns 创建promise的函数，可在该函数中传递参数来与baseEndpoint拼接，以生成最终需要的URL
 */
export default function (baseEndpoint) {
    /**
     * 发送GET请求获取资源
     * @param {Array<String>|{}|String|Number} param 传递给endpoint的参数列表
     */
    return async function (param = undefined) {
        var endpoint = combineUrl(baseEndpoint, param);
        if (endpoint) {
            var response = await fetch(restApiUrl + endpoint, {
                method: "GET",
                mode: mode,
                headers: {
                    "Authorization": "Basic " + credential
                }
            });
            if (response.ok) {
                var headers = response.headers,
                    totalItems = headers.get("X-WP-Total") || headers.get("x-wp-total"),
                    totalPages = headers.get("X-WP-TotalPages") || headers.get("x-wp-totalpages"),
                    result = await response.json();
                if (totalItems && totalPages) {
                    return {
                        totalItems: parseInt(totalItems),
                        totalPages: parseInt(totalPages),
                        result
                    }
                } else return result;
            }
            else console.error("fetch data failed");
        } else console.error("invalid params");
    }
}

function combineUrl(baseEndpoint, param) {
    //参数拼接，生成最终需要的URL
    //对于path中的变量，采用数组拼接方式，如posts/{id}
    //对于query中的变量，采用字符串拼接方式，如posts?{author}={1}&{cat}={1}
    if (typeof baseEndpoint === "string") {
        var endpoint1 = baseEndpoint;
        if (typeof param === "object") {
            for (var key in param) {
                endpoint1 += `&${key}=${param[key]}`;
            }
            return endpoint1;
        }
        else if (typeof param === "undefined") {
            return endpoint1;
        }
    }
    else if (baseEndpoint instanceof Array) {
        var endpoint2 = [],
            blockCount = baseEndpoint.length,
            paramArray = [];
        if (typeof param === "string" || typeof param === "number") {
            paramArray.push(param);
        } else if (param instanceof Array) {
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