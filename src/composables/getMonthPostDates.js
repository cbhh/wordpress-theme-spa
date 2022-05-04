import { ref } from "vue";
import postDateRangeOnlyDate from "../apis/postDateRangeOnlyDate";

/**
 * 计算当前月中含有post的日期
 */
export default function () {
    const dateList = ref([]);
    /**
     * 获取当前月所有post的date
     * @param {String} start 起始日期，y-mm-dd表示法
     * @param {String} end 结束日期，y-mm-dd表示法
     */
    const getDates = async function (start, end) {
        //[{ id: Number, date: String }]
        var { result } = await postDateRangeOnlyDate([start, end]),
            temp = [];
        result.forEach(function (item) {
            var dateStr = item.date,
                day = dateStr.split("T")[0].split("-")[2],
                dayNum = parseInt(day.startsWith("0") ? day.charAt("1") : day);
            if (!temp.includes(dayNum)) {
                temp.push(dayNum);
            }
        });
        dateList.value = temp;
    }
    return {
        dateList,
        getDates
    }
}