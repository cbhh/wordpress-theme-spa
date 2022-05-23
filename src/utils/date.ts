const monthMap: { [key: string]: string } = {
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
};
/**
 * 转换日期格式，e.g. 2022-03-07=>三月 7，2022
 * @param dateStr wordpress api返回的日期字符串，e.g.2022-03-07T13:35:30
 */
export function convertDateFormat(dateStr: string) {
    var date = dateStr && dateStr.split("T")[0],
        dateSplits = date && date.split("-");
    if (dateSplits) {
        return (
            monthMap[dateSplits[1]] +
            "月 " +
            (dateSplits[2].startsWith("0")
                ? dateSplits[2].charAt(1)
                : dateSplits[2]) +
            "，" +
            dateSplits[0]
        );
    }
}
/**
 * 生成日历数据
 * @param current 当前日期
 * @returns 本月月历二维数组，按照星期划分，没有日期的补空格
 */
export function generateCalendarData(current: Date) {
    var currentMonth = current.getMonth(),
        currentDate = current.getDate(),
        currentWeekDay = current.getDay(),
        currentYear = current.getFullYear(),
        //计算本月1号是星期几
        firstDayOfMonth = getFirstDay(currentDate, currentWeekDay),
        //计算本月多少天
        totalDays = getMonthTotalDays(currentMonth, currentYear),
        //计算本月多少个星期
        totalWeeks = totalDays
            ? getMonthTotalWeeks(totalDays, firstDayOfMonth)
            : 0,
        data = [],
        start = 1;
    for (var w = 1; w <= totalWeeks; w++) {
        var weekData = [];
        //第一周
        if (w === 1) {
            //补空格数量
            var offset = firstDayOfMonth,
                rest = 7 - offset;
            for (var o = 0; o < offset; o++) {
                weekData.push("");
            }
            //本周剩下天数
            for (var r = 0; r < rest; r++) {
                weekData.push(start);
                start += 1;
            }
        }
        //其余周，除了最后一个周
        else if (w !== totalWeeks) {
            for (var e = 0; e < 7; e++) {
                weekData.push(start);
                start += 1;
            }
        }
        //最后一周
        else {
            var lastDaysOfMonth = totalDays ? totalDays - start + 1 : -1,
                blanks = 7 - lastDaysOfMonth;
            if (lastDaysOfMonth >= 0) {
                for (var l = 0; l < lastDaysOfMonth; l++) {
                    weekData.push(start);
                    start += 1;
                }
                //补空格
                for (var b = 0; b < blanks; b++) {
                    weekData.push("");
                }
            }
        }
        data.push(weekData);
    }
    return data;
}
/**
 * 根据当前日期计算本月第一天是星期几
 * @param currentDate
 * @param currentWeekDay
 * @returns 本月1号是星期几，0-6，0表示星期天
 */
function getFirstDay(currentDate: number, currentWeekDay: number) {
    var elapse = currentDate - 1;
    return (7 + (currentWeekDay - (elapse % 7))) % 7;
}
/**
 * 根据指定月份数和年份计算该月总天数
 * @param month 0-11
 * @param year
 * @returns 31/30/29/28
 */
function getMonthTotalDays(month: number, year: number) {
    var m = month + 1;
    if ([1, 3, 5, 7, 8, 10, 12].includes(m)) {
        return 31;
    } else if (m === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return 29;
        } else {
            return 28;
        }
    } else if ([2, 4, 6, 9, 11].includes(m)) {
        return 30;
    }
}
/**
 * 根据月份总天数和1号星期数计算该月总共有多少个星期
 * @param totalDays 本月总共多少天
 * @param weekOfFirstDay 本月1号是星期几，0-6，0表示星期天
 * @returns 该月总星期数
 */
function getMonthTotalWeeks(totalDays: number, weekOfFirstDay: number) {
    var firstWeekDays = 7 - weekOfFirstDay,
        restDays = totalDays - firstWeekDays,
        restWholeWeeks = parseInt((restDays / 7).toString());
    if (restWholeWeeks * 7 === restDays) {
        return restWholeWeeks + 1;
    } else {
        return restWholeWeeks + 2;
    }
}
