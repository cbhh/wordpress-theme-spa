import BreadcrumbStateTypes, { BreadcrumbItem } from "./i";
import { defineStore } from "pinia";
/**
 * Category存储
 */
export default defineStore("breadcrumb", {
    state: (): BreadcrumbStateTypes => ({
        list: [],
    }),
    actions: {
        storeBreadcrumbList (data: BreadcrumbItem[]) {
            this.list = data;
        },
    },
});
