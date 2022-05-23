<script setup lang="ts">
import ThemeTable from "@/components/common/ThemeTable.vue";
import { generateCalendarData } from "@/utils/date";
import { computed } from "vue";

interface T {
    /**
     * 当前日期，一个Date对象
     */
    current: Date;
    /**
     * 本月中含有post的日期数组
     */
    hasPostDates?: number[];
}

const props = withDefaults(defineProps<T>(), {
    current: () => new Date(),
});

const head = ["日", "一", "二", "三", "四", "五", "六"];

const todayDate = computed(() => props.current.getDate()),
    monthData = computed(() => generateCalendarData(props.current));

const setCellStyle = (function () {
    if (props.hasPostDates) {
        return function (cellData: { value: number }) {
            var c = "",
                v = cellData.value;
            if (v === todayDate.value) {
                c += "today";
            }
            if (props.hasPostDates && props.hasPostDates.includes(v)) {
                c += "has-post";
            }
            return c;
        };
    } else {
        return function (cellData: { value: number }) {
            return cellData.value === todayDate.value ? "today" : "";
        };
    }
})();
</script>

<template>
    <ThemeTable
        :head="head"
        :body="monthData"
        :customizeCellClass="setCellStyle"
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
