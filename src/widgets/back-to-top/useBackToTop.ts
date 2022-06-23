import { ref } from "vue";

export default function () {
    const backToTopVisible = ref(false);
    /**
     * 根据窗口滚动切换回到顶部按钮可见性
     * @param wsy window scroll y
     * @param wh window inner height
     */
    const switchBackToTopVisible = function (wsy: number, wh: number) {
        backToTopVisible.value = wsy > wh ? true : false;
    };

    return {
        backToTopVisible,
        switchBackToTopVisible,
    };
}
