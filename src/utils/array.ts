/**
 * 对象数组中移除具有指定kv的项
 * @param objArray
 * @param specificKey
 *  @param specificValue
 */
export function deleteSpecificItemFromObjArray(
    objArray: any[],
    specificKey: string,
    specificValue: string
) {
    var len = objArray.length;
    for (var i = 0; i < len; i++) {
        if (objArray[i][specificKey] === specificValue) {
            objArray.splice(i, 1);
        }
    }
}
