import PageMetaModuleTypes from "./i";
import RootStateTypes from "@/store/i";
import { Module } from "vuex";

const pageMetaModule: Module<PageMetaModuleTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        title: "",
        time: "",
        background: "",
    },
    mutations: {
        /**
         * 存储page meta
         * @param state
         * @param data
         */
        storeUserList(state, data) {
            state.title = data.title;
            state.time = data.time;
            state.background = data.background;
        },
    },
};

export default pageMetaModule;
