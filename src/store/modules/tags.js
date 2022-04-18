import wpAppConfig from "@wpAppConfig";

const state = () => ({
    tagList: []
})

const mutations = {
    /**
     * 存储tag列表
     * @param {*} state 
     * @param {Array<{"id":Number,"count":Number,"name":String,"slug":String}>} data 
     */
    storeTagList(state, data) {
        //处理data，添加size属性
        var { min, max } = wpAppConfig.tagFontSize;
        if (min && max && max > min) {
            if (min < 0.4) min = 0.4;
            if (max > 2) max = 2;
            /**
             * data的深copy
             * @type Array<{"id":Number,"count":Number,"name":String,"slug":String,"map":Number}>
             */
            var copy = [],
                /**
                 * 所有count的值列表
                 * @type Array<Number>
                 */
                allCountList = [];
            data.forEach(function (t, index) {
                copy.push({
                    id: t.id,
                    count: t.count,
                    name: t.name,
                    slug: t.slug,
                    //对原始data中对应元素位置的映射
                    map: index
                });
                if (!allCountList.includes(t.count)) {
                    allCountList.push(t.count);
                }
            });
            if (allCountList.length !== 1) {
                //按照count值从小到大排序     
                copy.sort((a, b) => a.count > b.count);
                var total = copy.length,
                    minCount = copy[0].count,
                    maxCount = copy[total - 1].count,
                    step = (max - min) / (allCountList.length - 1);
                //TODO:需要考虑具有相同count值的项，这些项应设置相同的size
                /**
                 * 在copy数组中查找具有相同count值的项，并设置其在data数组中对应值的size属性
                 * @param {Number} start 查找起始index（包含）
                 * @param {Number} end 查找结束index（包含），不一定会一直查找到该index，如果查找不到符合条件的项，则会提前退出循环
                 * @param {Number} count 
                 * @param {Number} size 
                 * @param {Boolean} reverse 是否倒序查找，默认false
                 * @returns 查找终止处的index值
                 */
                const findSameCountItem = function (start, end, count, size, reverse = false) {
                    if (!reverse) {
                        if (start > end) return;
                        for (var f = start; f <= end; f++) {
                            var c = copy[f];
                            if (c.count === count) {
                                data[c.map]["size"] = size;
                            } else return f;
                        }
                    } else {
                        if (start < end) return;
                        for (var f = start; f >= end; f--) {
                            var c = copy[f];
                            if (c.count === count) {
                                data[c.map]["size"] = size;
                            } else return f;
                        }
                    }
                }
                //最小值
                var stopMinIndex = findSameCountItem(0, total - 1, minCount, min),
                    //最大值
                    stopMaxIndex = findSameCountItem(total - 1, 0, maxCount, max, true),
                    //中间值
                    currentIndex = stopMinIndex,
                    size = min + step;
                while (currentIndex <= stopMaxIndex) {
                    currentIndex = findSameCountItem(currentIndex, stopMaxIndex, copy[currentIndex].count, size);
                    size += step;
                }
            }
        }
        state.tagList = data;
    }
}

export default {
    state,
    mutations
}