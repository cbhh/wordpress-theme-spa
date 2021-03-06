import { deleteSpecificItemFromObjArray } from "@/utils/array";

interface HandleType {
    name: string | symbol;
    thisArg: unknown;
    callback: (wsy: number, wh: number) => void;
}

function windowScroller () {
    let timer = 0;
    const handles: HandleType[] = [];
    window.addEventListener("scroll", function () {
        if (!timer) {
            timer = window.setTimeout(function () {
                const wsy = window.scrollY,
                    wh = window.innerHeight;
                handles.forEach(function (item) {
                    item.callback.call(item.thisArg, wsy, wh);
                });
                timer = 0;
            }, 100);
        }
    });
    /**
     * 添加scroll事件处理器
     * @param name 事件处理器名称，用于唯一标识该处理器
     * @param thisArg 用于传入回调函数的this对象
     * @param callback 事件处理器函数，wsy为当前窗口垂直方向滚动距离，wh为当前窗口高度，全局scroll事件处理会向每个回调函数自动注入这两个参数
     */
    const addHandle = function (
        name: string | symbol,
        thisArg: unknown,
        callback: (wsy: number, wh: number) => void
    ) {
        let isNameNoRepeated = true;
        if (typeof name === "string") {
            isNameNoRepeated = handles.every(function (item) {
                return item.name !== name;
            });
        }
        if (isNameNoRepeated) {
            handles.push({ name: name, thisArg: thisArg, callback: callback });
        }
    };
    /**
     * 根据name移除一个scroll事件处理器
     * @param name
     */
    const deleteHandle = function (name: string | symbol) {
        deleteSpecificItemFromObjArray(handles, "name", name);
    };
    return {
        addHandle,
        deleteHandle,
    };
}
/**
 * 全局scroll事件处理
 */
export default windowScroller();
