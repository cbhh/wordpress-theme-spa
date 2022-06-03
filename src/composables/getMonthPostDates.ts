import { ref } from "vue";
import getPostList from "@/apis/getPostList";
import PostListItem from "@/context/post-list/postListItem";

function generateUniqueDayArray (allDateStr: string[]) {
    const temp: number[] = [];
    allDateStr.forEach(function (item) {
        const day = item.split("T")[0].split("-")[2],
            dayNum = parseInt(day.startsWith("0") ? day.charAt(1) : day);
        if (!temp.includes(dayNum)) {
            temp.push(dayNum);
        }
    });
    return temp;
}

/**
 * 计算当前月中含有post的日期
 */
export default function () {
    const dateList = ref<number[]>([]);
    /**
     * （从所有文章中）查找当前月所有post的date
     * @param date 当前日期对象
     * @param allPostList 所有文章列表，传递该参数表明需要从该列表中筛选当前月的post
     */
    const getDates = async function (date: Date, allPostList?: PostListItem[]) {
        const year = date.getFullYear(),
            month = date.getMonth() + 1;
        if (allPostList) {
            const yearMonthStr = `${year}-${month > 9 ? month : "0" + month}`,
                allDates: string[] = [];
            for (const item of allPostList) {
                if (item.date.startsWith(yearMonthStr)) {
                    allDates.push(item.date);
                }
            }
            dateList.value = generateUniqueDayArray(allDates);
        } else {
            const res = await getPostList({
                start: [year, month, 1],
                end: [year, month, 31],
            });
            if (res) {
                const allDates = res.result.map((item) => item.date);
                dateList.value = generateUniqueDayArray(allDates);
            }
        }
    };
    return {
        dateList,
        getDates,
    };
}