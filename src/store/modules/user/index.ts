import UserModuleTypes, { User } from "./i";
import RootStateTypes from "@/store/i";
import { Module } from "vuex";

const userModule: Module<UserModuleTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        userList: [],
    },
    mutations: {
        /**
         * 存储user列表
         * @param state
         * @param data
         */
        storeUserList(state, data: User[]) {
            state.userList = data;
        },
    },
};

export default userModule;
