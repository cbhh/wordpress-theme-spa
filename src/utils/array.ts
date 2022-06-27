/**
 * 对象数组中移除具有指定kv的项
 * @param objArray
 * @param specificKey
 * @param specificValue
 */
export function deleteSpecificItemFromObjArray (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objArray: { [key: string]: any }[],
    specificKey: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specificValue: any
) {
    const len = objArray.length;
    for (let i = 0; i < len; i++) {
        if (objArray[i][specificKey] === specificValue) {
            objArray.splice(i, 1);
        }
    }
}
