import { ref, computed } from "vue";
import { randomString } from "../utils/random";

/**
 * 从dom上下文提取图片描述信息
 * @param {HTMLImageElement} pImg 
 * @returns 图片描述信息，来自紧跟该image元素的figcaption元素或者alt数据
 */
function findImageDescription(pImg) {
    //查找figcaption
    if (pImg.parentElement.tagName === "FIGURE") {
        /**
         * @type HTMLElement
         */
        var figcaption = pImg.nextElementSibling;
        if (figcaption && figcaption.tagName === "FIGCAPTION" && figcaption.innerText) {
            return figcaption.innerText;
        }
    }
    //查找alt
    return pImg.alt ? pImg.alt : "";
}
/**
 * 生成图片画廊数据
 */
export default function () {
    /**
     * 图片列表
     */
    const galleryImageList = ref([]),
        /**
         * 保存post中所有image标签的引用
         */
        postImageArray = ref([]),
        /**
         * 当前图片是第几张图片，从1开始
         */
        currentImageIndex = ref(1);
    /**
     * 生成图片列表
     * @param {HTMLDivElement} contentRef 内容dom的引用
     */
    const generateGalleryImageList = function (contentRef) {
        if (contentRef && contentRef instanceof HTMLDivElement) {
            var els = contentRef.getElementsByTagName("img"),
                count = els.length;
            for (var i = 0; i < count; i++) {
                var pImg = els.item(i),
                    nonce = randomString(4);
                pImg.dataset.imgLink = nonce;
                postImageArray.value.push(pImg);
                galleryImageList.value.push({
                    imgLink: nonce,
                    src: pImg.src,
                    srcset: pImg.srcset,
                    current: false,
                    pre: false,
                    next: false,
                    description: findImageDescription(pImg)
                })
            }
        }
    }

    return {
        galleryImageList,
        currentImageIndex,
        generateGalleryImageList
    }
}
