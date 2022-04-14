const monthMap = {
    "01": "一",
    "02": "二",
    "03": "三",
    "04": "四",
    "05": "五",
    "06": "六",
    "07": "七",
    "08": "八",
    "09": "九",
    "10": "十",
    "11": "十一",
    "12": "十二",
}
/**
 * 转换日期格式，e.g. 2022-03-07=>三月 7，2022
 * @param {String} dateStr wordpress api返回的日期字符串，e.g.2022-03-07T13:35:30
 */
export function convertDateFormat(dateStr) {
    const dateSplits = dateStr.split("T")[0].split("-");
    return monthMap[dateSplits[1]] + "月 " + dateSplits[2].startsWith("0") ? dateSplits[2].charAt(1) : dateSplits[2] + "，" + dateSplits[0];
}