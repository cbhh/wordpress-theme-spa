<script setup>
import ThemeTable from "../../../common/ThemeTable.vue";
import { generateCalendarData } from "../../../../utils/date";
import { computed } from "vue";

const props = defineProps({
    /**
     * 当前日期，一个Date对象
     */
    current: {
        type: Date,
        required: true,
    },
    /**
     * 本月中含有post的日期数组
     */
    hasPostDates: {
        type: Array,
        required: true,
    },
});

const head = ["日", "一", "二", "三", "四", "五", "六"];

const todayDate = computed(() => props.current.getDate());
const monthData = computed(() => generateCalendarData(props.current));

const cellStyle = function (cellData) {
    var c = "",
        v = cellData.value;
    if (v === todayDate.value) {
        c += "today";
    }
    if (props.hasPostDates.includes(v)) {
        c += "has-post";
    }
    return c;
};
</script>

<template>
    <ThemeTable
        :head="head"
        :body="monthData"
        :customizeCellClass="cellStyle"
        class="month-calendar"
    ></ThemeTable>
</template>

<style lang="scss">
.month-calendar {
    width: 100%;
    thead {
        font-family: var(--theme-font);
    }
    tbody {
        font-size: 0.8rem;
        line-height: 2;
    }
    .today {
        background: var(--theme-color);
        color: #fff;
        border-radius: 10px;
    }
    .has-post {
        color: var(--theme-color);
        font-weight: bold;
    }
}
</style>
