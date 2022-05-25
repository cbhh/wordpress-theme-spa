import { ref, computed } from "vue";
import { CatalogItemType } from "@/widgets/props";

const headings = ["H2", "H3", "H4", "H5", "H6"];
/**
 * 生成目录数据
 */
export default function () {
    /**
     * 目录数据数组
     */
    const catalogList = ref<CatalogItemType[]>([]),
        /**
         * 保存所有heading元素
         */
        headingArray: HTMLHeadingElement[] = [],
        /**
         * 目录可见性
         */
        catalogVisible = ref(true);
    /**
     * 上一次选中的目录项对应的数据
     */
    var lastClickedCatalogItem = {} as CatalogItemType;
    /**
     * 目录项总数
     */
    const catalogItemCount = computed(() => catalogList.value.length),
        /**
         * 目录是否需要
         */
        catalogRequired = computed(() => catalogItemCount.value > 0);
    /**
     * 生成目录数据
     * @param contentRef 内容dom的引用
     */
    const generateCatalogList = function (contentRef: HTMLDivElement) {
        if (contentRef && contentRef instanceof HTMLDivElement) {
            var children = contentRef.children,
                count = contentRef.childElementCount,
                lastTag = 1,
                tagCount = [1, 0, 0, 0, 0, 0];
            for (var i = 0; i < count; i++) {
                var node = children.item(i) as HTMLHeadingElement,
                    tag = node.tagName;
                if (tag === "H1") {
                    console.error(
                        "Too many <h1> heading tags in single document"
                    );
                    tagCount[0] += 1;
                    lastTag = 1;
                } else if (headings.includes(tag)) {
                    var level = parseInt(tag.charAt(1));
                    tagCount[level - 1] += 1;
                    if (level - lastTag > 1) {
                        console.warn(
                            `<h${lastTag}> tag should not be followed directly by <h${level}> tag`
                        );
                    }
                    if (!node.id) {
                        node.id = `h${level}-${tagCount[level - 1]}`;
                    }
                    node.dataset.headingAnchor = catalogItemCount.value + "";
                    headingArray.push(node);
                    lastTag = level;
                    catalogList.value.push({
                        text: node.innerText,
                        headingLevel: level,
                        href: node.id,
                        isCurrent: false,
                        headingIndex: catalogItemCount.value,
                    });
                }
            }
        }
    };
    /**
     * 监听窗口滚动，动态更新目录列表当前项
     */
    const switchCurrentCatalogItem = function () {
        for (var i = catalogItemCount.value - 1; i >= 0; i--) {
            var h = headingArray[i];
            if (h.getBoundingClientRect().top <= 80) {
                var anchor = h.dataset.headingAnchor;
                //若当前所处heading与上一个heading不同，则更新样式
                if (
                    anchor &&
                    anchor !== lastClickedCatalogItem.headingIndex + ""
                ) {
                    setClickedCatalogItemStyle(parseInt(anchor));
                }
                break;
            }
        }
    };
    /**
     * 设置选中目录项的样式
     * @param clickedItemIndex
     */
    const setClickedCatalogItemStyle = function (clickedItemIndex: number) {
        lastClickedCatalogItem.isCurrent = false;
        var item = catalogList.value[clickedItemIndex];
        item.isCurrent = true;
        lastClickedCatalogItem = item;
    };
    return {
        catalogList,
        catalogRequired,
        generateCatalogList,
        catalogVisible,
        setClickedCatalogItemStyle,
        switchCurrentCatalogItem,
    };
}
