import { deleteSpecificItemFromObjArray } from "../utils/array";

function windowScroller() {
    var timer = 0,
        handles = [];
    window.addEventListener("scroll", function () {
        if (!timer) {
            timer = setTimeout(function () {
                var wsy = window.scrollY;
                handles.forEach(function (item) {
                    item.callback.call(item.thisArg, wsy);
                });
                timer = 0;
            }, 100)
        }
    });
    /**
     * add scroll handle
     * @param {String} name 
     * @param {Object} thisArg 
     * @param {Function} callback 
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