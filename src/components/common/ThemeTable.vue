<script setup lang="ts">
interface T {
    head?: (string | number)[];
    body: (string | number)[][];
    foot?: (string | number)[];
    /**
     * 自定义cell样式，函数要返回一个字符串作为所要应用的class名
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customizeCellClass?: (v: { value: any }) => string;
}

const props = withDefaults(defineProps<T>(), {
    body: () => [[""]],
    head: () => [""],
    foot: () => [""],
    customizeCellClass: undefined,
});
</script>

<template>
    <table class="theme-table">
        <thead v-if="props.head">
            <tr>
                <th
                    v-for="item in props.head"
                    :key="item"
                >
                    {{ item }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, index) in props.body"
                :key="index"
            >
                <td
                    v-for="item in row"
                    :key="item"
                    :class="
                        customizeCellClass &&
                            customizeCellClass({ value: item })
                    "
                >
                    {{ item }}
                </td>
            </tr>
        </tbody>
        <tfoot v-if="props.foot">
            <tr>
                <td
                    v-for="item in props.foot"
                    :key="item"
                >
                    {{ item }}
                </td>
            </tr>
        </tfoot>
    </table>
</template>
