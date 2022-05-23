import { ref } from "vue";
import apis from "@/apis";
/**
 * 计算当前月中含有post的日期
 */
export default function () {
    const dateList = ref<number[]>([]);
    /**
     * 获取当前月所有post的date
     * @param start 起始日期，y-mm-dd表示法
     * @param end 结束日期，y-mm-dd表示法
     */
    const getDates = async function (start: string, end: string) {
        var { result } = await apis.getPostIdListByDateRange([start, end]),
            temp: number[] = [];
        result.forEach(function (item) {
            var dateStr = item.date,
                day = dateStr.split("T")[0].split("-")[2],
                dayNum = parseInt(day.startsWith("0") ? day.charAt(1) : day);
            if (!temp.includes(dayNum)) {
                temp.push(dayNum);
            }
        });
        dateList.value = temp;
    };
    return {
        dateList,
        getDates,
    };
}
