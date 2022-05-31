import BreadcrumbModuleTypes from "./i";
import RootStateTypes from "@/store/i";
import { Module } from "vuex";

const breadcrumbModule: Module<BreadcrumbModuleTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        list: [],
    },
    mutations: {
        /**
         * 存储breadcrumb list
         * @param state
         * @param data
         */
        setBreadcrumbNav (state, data) {
            state.list = data;
        },
    },
};

export default breadcrumbModule;
