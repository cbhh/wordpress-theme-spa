import wpAppConfig from "../../wp-app.config";

const credential = window.btoa(wpAppConfig.apiUser + ":" + wpAppConfig.appPwd),
    mode = wpAppConfig.apiBaseUrl.startsWith(wpAppConfig.siteUrl) ? "same-origin" : "cors";
/**
 * 获取远程资源
 * @param {String} endpoint
 */
export default function (endpoint) {
    return async function () {
        //TODO:启用loading动画
        const response = await fetch(wpAppConfig.apiBaseUrl + endpoint, {
            method: "GET",
            mode: mode,
            headers: {
                "Authorization": "Basic " + credential
            }
        }),
            result = await response.json();
        //TODO:停用loading动画
        return result;
    }
}