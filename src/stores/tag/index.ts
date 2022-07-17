import { defineStore } from "pinia";
import getTagList from "@/apis/getTagList";
import TagStateTypes, {
    TagListItemWithSize,
    TempTagListItem,
    OriginTagListItem,
} from "./i";
import { styleRuntime } from "@wpAppConfig";

let attemptTimes = 0;

export default defineStore("tag", {
    state: (): TagStateTypes => ({
        tagList: [],
    }),
    getters: {
        /**
         * 根据slug获取tag详情
         * @param state
         */
        getTagDetailBySlug: (
            state
        ): ((slug: string) => OriginTagListItem | undefined) => {
            return (tagSlug: string) =>
                state.tagList.find((item) => item.slug === tagSlug);
        },
        /**
         * 根据id获取tag详情
         * @param state
         */
        getTagDetailById: (
            state
        ): ((id: number) => OriginTagListItem | undefined) => {
            return (tagId: number) =>
                state.tagList.find((item) => item.id === tagId);
        },
    },
    actions: {
        storeTagList (data: TagListItemWithSize[]) {
            //处理data，添加size属性
            let { min, max } = styleRuntime.tagFontSize;
            if (min && max && max > min) {
                if (min < 0.4) {
                    min = 0.4;
                }
                if (max > 2) {
                    max = 2;
                }
                /**
                 * data的深copy
                 */
                const copy: TempTagListItem[] = [],
                    /**
                     * 所有count的值列表
                     */
                    allCountList = new Set<number>();
                data.forEach(function (t, index) {
                    copy.push({
                        id: t.id,
                        count: t.count,
                        name: t.name,
                        slug: t.slug,
                        map: index,
                    });
                    allCountList.add(t.count);
                });
                if (allCountList.size !== 1) {
                    //按照count值从小到大排序
                    copy.sort((a, b) => a.count - b.count);
                    const total = copy.length,
                        minCount = copy[0].count,
                        maxCount = copy[total - 1].count,
                        step = (max - min) / (allCountList.size - 1),
                        /**
                         * 最小值的查找停止位置
                         */
                        stopMinIndex = findSameCountItem(
                            data,
                            copy,
                            0,
                            total - 1,
                            minCount,
                            min
                        ),
                        /**
                         * 最大值的查找停止位置
                         */
                        stopMaxIndex = findSameCountItem(
                            data,
                            copy,
                            total - 1,
                            0,
                            maxCount,
                            max,
                            true
                        );
                    let size = min + step;
                    //:[1,1,1,1,2,3]类似这种情况时，最大值最小值查找停止位置都是4
                    if (stopMinIndex === stopMaxIndex) {
                        const c = copy[stopMinIndex],
                            d = data[c.map] as TagListItemWithSize;
                        d["size"] = size;
                    } else {
                        //中间值查找位于stopMinIndex和stopMaxIndex之间
                        let currentIndex = stopMinIndex;
                        while (currentIndex < stopMaxIndex) {
                            const stopIndex = findSameCountItem(
                                data,
                                copy,
                                currentIndex,
                                stopMaxIndex,
                                copy[currentIndex].count,
                                size
                            );
                            currentIndex = stopIndex;
                            size += step;
                        }
                    }
                }
            }
            this.tagList = data;
        },
        /**
         * 获取原始tag列表
         */
        async getTagList () {
            const res = await getTagList();
            if (res) {
                this.storeTagList(res.result);
            }
        },
        /**
         * 根据id获取tag详情，本地获取不到时从服务器重新获取完整tag列表，最多支持2次重试次数
         * @param id
         */
        async getTagDetailByIdAsync (id: number) {
            if (attemptTimes < 2) {
                const currentResult = this.getTagDetailById(id);
                if (!currentResult) {
                    await this.getTagList();
                    attemptTimes += 1;
                    await this.getTagDetailByIdAsync(id);
                } else {
                    attemptTimes = 0;
                    return currentResult;
                }
            } else {
                console.error("max attempt times exceed");
            }
        },
        /**
         * 根据slug获取tag详情，本地获取不到时从服务器重新获取完整tag列表，最多支持2次重试次数
         * @param slug
         */
        async getTagDetailBySlugAsync (slug: string) {
            if (attemptTimes < 2) {
                const currentResult = this.getTagDetailBySlug(slug);
                if (!currentResult) {
                    await this.getTagList();
                    attemptTimes += 1;
                    await this.getTagDetailBySlugAsync(slug);
                } else {
                    attemptTimes = 0;
                    return currentResult;
                }
            } else {
                console.error("get tag: max attempt times exceed");
            }
        },
    },
});
/**
 * 在copy数组中查找具有相同count值的项，并设置其在data数组中对应值的size属性
 * @param data
 * @param copy
 * @param start 查找起始index（包含）
 * @param end 查找结束index（包含），不一定会一直查找到该index，如果查找不到符合条件的项，则会提前退出循环
 * @param count
 * @param size
 * @param reverse 是否倒序查找，默认false
 * @returns 查找终止处的index值，当所有的值都符合条件时（不中途return），直接返回指定的end值
 */
function findSameCountItem (
    data: TagListItemWithSize[],
    copy: TempTagListItem[],
    start: number,
    end: number,
    count: number,
    size: number,
    reverse = false
): number {
    if (!reverse) {
        for (let f = start; f <= end; f++) {
            const c = copy[f];
            if (c.count === count) {
                data[c.map]["size"] = size;
            } else {
                return f;
            }
        }
        //没有不符合条件的值（不中途return），直接返回指定的end值
        return end;
    } else {
        for (let f = start; f >= end; f--) {
            const c = copy[f];
            if (c.count === count) {
                data[c.map]["size"] = size;
            } else {
                return f;
            }
        }
        return end;
    }
}
