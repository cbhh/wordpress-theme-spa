/**
 * remove first item which has specific kv from an object array
 * @param {[{}]} objArray 
 * @param {String} specificKey 
 *  @param {String} specificValue
 */
export function deleteSpecificItemFromObjArray(objArray, specificKey, specificValue) {
    var len = objArray.length;
    for (var i = 0; i < len; i++) {
        if (objArray[i][specificKey] === specificValue) {
            objArray.splice(i, 1);
        }
    }
}