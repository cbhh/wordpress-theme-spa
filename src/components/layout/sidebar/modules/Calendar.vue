<script setup>
import ThemeTable from "../../../common/ThemeTable.vue";
import { generateCalendarData } from "../../../../utils/date";

const head = ["日", "一", "二", "三", "四", "五", "六"];

const today = new Date(),
    todayDate = today.getDate(),
    monthData = generateCalendarData(today);
const cellStyle = function (cellData) {
    if (cellData.value === todayDate) {
        return "today";
    }
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
        > a {
            color: #fff;
        }
    }
    a {
        color: var(--theme-color);
        font-weight: bold;
    }
    .has-post {
        transition: var(--theme-transition);
        border-radius: 10px;
        &:hover {
            background: var(--theme-color-gray);
            > a {
                color: #fff;
            }
        }
    }
}
</style>
