import TagModuleTypes, {
    OriginTagListItem,
    TagListItemWithSize,
    TempTagListItem,
} from "./i";
import RootStateTypes from "@/store/i";
import { Module } from "vuex";
import wpAppConfig from "@wpAppConfig";

const tagModule: Module<TagModuleTypes, RootStateTypes> = {
    namespaced: true,
    state: {
        tagList: [],
    },
    mutations: {
        /**
         * 存储tag列表
         * @param state
         * @param data
         */
        storeTagList (state, data: OriginTagListItem[]) {
            //处理data，添加size属性
            let { min, max } = wpAppConfig.tagFontSize;
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
                    allCountList: number[] = [];
                data.forEach(function (t, index) {
                    copy.push({
                        id: t.id,
                        count: t.count,
                        name: t.name,
                        slug: t.slug,
                        map: index,
                    });
                    if (!allCountList.includes(t.count)) {
                        allCountList.push(t.count);
                    }
                });
                if (allCountList.length !== 1) {
                    //按照count值从小到大排序
                    copy.sort((a, b) => a.count - b.count);
                    const total = copy.length,
                        minCount = copy[0].count,
                        maxCount = copy[total - 1].count,
                        step = (max - min) / (allCountList.length - 1),
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
                    //TODO:[1,1,1,1,2,3]类似这种情况时，最大值最小值查找停止位置都是4
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
            state.tagList = data;
        },
    },
};

//TODO:需要考虑具有相同count值的项，这些项应设置相同的size
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
const findSameCountItem = function (
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
};

export default tagModule;
