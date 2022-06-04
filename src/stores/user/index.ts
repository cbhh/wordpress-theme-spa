import { defineStore } from "pinia";
import getUserList from "@/apis/getUserList";
import UserStateTypes, { User } from "./i";
/**
 * Category存储
 */
export default defineStore("user", {
    state: (): UserStateTypes => ({
        userList: [],
    }),
    getters: {
        /**
         * 根据id获取category详情
         * @param state
         */
        getUserDetailById: (state): ((id: number) => User | undefined) => {
            return (userId: number) =>
                state.userList.find((item) => item.id === userId);
        },
    },
    actions: {
        /**
         * 获取原始user列表
         */
        async getUserlist () {
            const res = await getUserList();
            if (res) {
                this.userList = res.result;
            }
        },
    },
});
