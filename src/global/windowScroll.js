import { deleteSpecificItemFromObjArray } from "../utils/array";

function windowScroller() {
    var timer = 0,
        handles = [];
    window.addEventListener("scroll", function () {
        if (!timer) {
            timer = setTimeout(function () {
                var wsy = window.scrollY, wh = window.innerHeight;
                handles.forEach(function (item) {
                    item.callback.call(item.thisArg, wsy, wh);
                });
                timer = 0;
            }, 100)
        }
    });
    /**
     * add scroll handle
     * @param {String} name 事件处理器名称，用于唯一标识该处理器
     * @param {any} thisArg 用于传入回调函数的this对象
     * @param {(wsy:Number,wh:Number)=>void} callback 事件处理器函数，wsy为当前窗口垂直方向滚动距离，wh为当前窗口高度，全局scroll事件处理会向每个回调函数自动注入这两个参数
     */
    var addHandle = function (name, thisArg, callback) {
        var isNameNoRepeated = handles.every(function (item) {
            return item.name !== name;
        });
        if (isNameNoRepeated) {
            handles.push({ name: name, thisArg: thisArg, callback: callback })
        }
    };
    /**
     * delete scroll handle
     * @param {String} name 
     */
    var deleteHandle = function (name) {
        deleteSpecificItemFromObjArray(handles, "name", name);
    };
    return {
        addHandle, deleteHandle
    }
}
/**
 * 全局scroll事件处理
 */
export default windowScroller()