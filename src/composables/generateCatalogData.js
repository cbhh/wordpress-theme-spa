import { ref, computed } from "vue";
import { CatalogItemDataType } from "../plugins/post-catalog/catalog";
import { randomString } from "../utils/random"

const headings = ["H2", "H3", "H4", "H5", "H6"];
/**
 * 生成目录数据
 */
export default function () {
    /**
     * 目录数据数组
     */
    const catalogList = ref([]),
        /**
         * 上一次选中的目录项对应的数据
         */
        lastClickedCatalogItem = ref({}),
        /**
         * 保存所有heading元素
         */
        headingArray = ref([]);
    /**
     * 目录是否需要
     */
    const catalogRequired = computed(() => catalogList.value.length > 0);
    /**
     * 生成目录数据
     * @param {HTMLDivElement} contentRef 内容dom的引用
     */
    const generateCatalogList = function (contentRef) {
        if (contentRef && contentRef instanceof HTMLDivElement) {
            var children = contentRef.children,
                count = contentRef.childElementCount,
                lastTag = 1,
                tagCount = [1, 0, 0, 0, 0, 0];
            for (var i = 0; i < count; i++) {
                var node = children.item(i),
                    tag = node.tagName;
                if (tag === "H1") {
                    console.error("Too many <h1> heading tags in single document");
                    tagCount[0] += 1;
                    lastTag = 1;
                }
                else if (headings.includes(tag)) {
                    var level = tag.charAt(1),
                        nonce = randomString(4);
                    tagCount[level - 1] += 1;
                    if (level - lastTag > 1) {
                        console.warn(`<h${lastTag}> tag should not be followed directly by <h${level}> tag`);
                    }
                    if (!node.id) {
                        node.id = `h${level}-${tagCount[level - 1]}-${nonce}`;
                    }
                    node.dataset.anchor = nonce;
                    headingArray.value.push(node);
                    lastTag = level;
                    catalogList.value.push({
                        text: node.innerText,
                        level: parseInt(level),
                        href: node.id,
                        current: false,
                        anchor: nonce
                    });
                }
            }
        }
    };
    /**
     * 设置选中目录项的样式
     * @param {CatalogItemDataType} clickedItem
     */
    const setClickedCatalogItemStyle = function (clickedItem) {
        lastClickedCatalogItem.value.current = false;
        clickedItem.current = true;
        lastClickedCatalogItem.value = clickedItem;
    };
    return {
        catalogList,
        catalogRequired,
        generateCatalogList,
        headingArray,
        lastClickedCatalogItem,
        setClickedCatalogItemStyle
    }
}