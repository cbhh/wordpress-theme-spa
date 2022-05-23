/**
 * 生成长度不大于13的随机数字与字母组合的字符串
 * @param length 字符串长度
 * @returns 生成的字符串
 */
export function randomString13(length: number) {
    return length <= 13 && length > 0
        ? Math.random()
              .toString(16)
              .substring(2, length + 2)
        : "";
}
