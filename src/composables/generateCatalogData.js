import { ref } from "vue";

function randomString(length) {
    if (length <= 13 && length > 0) {
        return Math.random().toString(16).substring(2, length + 2);
    }
}
const headings = ["H2", "H3", "H4", "H5", "H6"];
/**
 * 生成目录数据
 */
export default function () {
    const catalogData = ref([]);
    /**
     * 生成目录数据
     * @param {HTMLDivElement} contentRef 内容dom的引用
     */
    const generateData = function (contentRef) {
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
                    lastTag = level;
                    console.log(node);
                    catalogData.value.push({
                        text: node.innerText,
                        level: parseInt(level),
                        href: node.id,
                        current: false,
                        anchor: nonce
                    });
                }
            }
            console.log(catalogData);
        }
    };

    return {
        catalogData,
        generateData
    }
}