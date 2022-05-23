import { ref, computed } from "vue";
import { CatalogItemType } from "@/widgets/props";
import { randomString13 } from "@/utils/random";

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
                    var level = parseInt(tag.charAt(1)),
                        nonce = randomString13(4);
                    tagCount[level - 1] += 1;
                    if (level - lastTag > 1) {
                        console.warn(
                            `<h${lastTag}> tag should not be followed directly by <h${level}> tag`
                        );
                    }
                    if (!node.id) {
                        node.id = `h${level}-${tagCount[level - 1]}-${nonce}`;
                    }
                    node.dataset.anchor = nonce;
                    headingArray.push(node);
                    lastTag = level;
                    catalogList.value.push({
                        text: node.innerText,
                        headingLevel: level,
                        href: node.id,
                        isCurrent: false,
                        headingAnchor: nonce,
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
                var anchor = h.dataset.anchor;
                //小小的优化：若当前所处heading与上一个heading相同，则不执行任何操作
                if (anchor !== lastClickedCatalogItem.headingAnchor) {
                    var dataItem = catalogList.value.find(
                        (i) => i.headingAnchor === anchor
                    );
                    dataItem && setClickedCatalogItemStyle(dataItem);
                }
                break;
            }
        }
    };
    /**
     * 设置选中目录项的样式
     * @param clickedItem
     */
    const setClickedCatalogItemStyle = function (clickedItem: CatalogItemType) {
        lastClickedCatalogItem.isCurrent = false;
        clickedItem.isCurrent = true;
        lastClickedCatalogItem = clickedItem;
    };
    /**
     * 切换目录可见性
     */
    const switchCatalogVisible = function () {
        catalogVisible.value = !catalogVisible.value;
    };
    return {
        catalogList,
        catalogRequired,
        generateCatalogList,
        catalogVisible,
        setClickedCatalogItemStyle,
        switchCatalogVisible,
        switchCurrentCatalogItem,
    };
}
