import wpAppConfig from "@wpAppConfig";

const credential = window.btoa(wpAppConfig.apiUser + ":" + wpAppConfig.appPwd),
    mode = wpAppConfig.apiBaseUrl.startsWith(wpAppConfig.siteUrl) ? "same-origin" : "cors";
const paramSearchReg = /{\w+}/g;
/**
 * 获取远程资源
 * @param {String} endpoint
 * @returns 创建promise的函数，可在该函数中传递参数用来逐个替换endpoint中的{}部分，以生成最终需要的URL
 */
export default function (endpoint) {
    /**
     * 发送GET请求获取资源
     * @param {Array<String|Number>} param 传递给endpoint的参数列表
     */
    return async function (...param) {
        //参数替换，生成新的endpoint字符串
        var paramCount = param.length,
            reGenerateEndPoint = false,
            ep = "";
        if (paramCount) {
            var part = endpoint.split(paramSearchReg);
            if (part.length > 1) {
                for (var i = 0; i < paramCount; i++) {
                    ep += part[i];
                    ep += param[i];
                }
                ep += part[part.length - 1];
                reGenerateEndPoint = true;
                //TODO:此处函数闭包内部不可直接修改外部函数的参数，否则所有闭包都会受到影响
                //endpoint = ep;
            }
        }
        //TODO:启用loading动画
        const response = await fetch(wpAppConfig.apiBaseUrl + (reGenerateEndPoint ? ep : endpoint), {
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