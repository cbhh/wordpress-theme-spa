import { defineStore } from "pinia";
import getUserList from "@/apis/getUserList";
import UserStateTypes, { User } from "./i";

let attemptTimes = 0;

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
        /**
         * 根据id获取user详情，本地获取不到时从服务器重新获取完整user列表，最多支持2次重试次数
         * @param id
         */
        async getUserDetailByIdAsync (id: number) {
            if (attemptTimes < 2) {
                const currentResult = this.getUserDetailById(id);
                if (!currentResult) {
                    await this.getUserlist();
                    attemptTimes += 1;
                    await this.getUserDetailByIdAsync(id);
                } else {
                    attemptTimes = 0;
                    return currentResult;
                }
            } else {
                console.error("get user: max attempt times exceed");
            }
        },
    },
});
