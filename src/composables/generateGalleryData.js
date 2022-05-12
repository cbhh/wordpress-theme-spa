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
         * link-index映射关系（对象形式方便查找）
         */
        linkIndexMap = {},
        /**
         * 画廊可见性
         */
        galleryVisible = ref(false),
        /**
         * 当前选中的图片位置，从0开始
         */
        currentImageIndex = ref(0);
    /**
     * 图片总数
     */
    const galleryItemCount = computed(() => galleryImageList.value.length),
        /**
         * 画廊是否需要
         */
        galleyRequired = computed(() => galleryItemCount.value > 0);

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
                pImg.title = "在画廊中查看";
                pImg.dataset.imgLink = nonce;
                galleryImageList.value.push({
                    imgLink: nonce,
                    src: pImg.src,
                    srcset: pImg.srcset,
                    current: false,
                    pre: false,
                    next: false,
                    description: findImageDescription(pImg)
                });
                //保存imgLink-index的映射关系
                linkIndexMap[nonce] = i;
                //img元素绑定点击事件
                pImg.addEventListener("click", function () {
                    if (!galleryVisible.value) {
                        setCurrentImage(this.dataset.imgLink);
                        switchGalleyVisible(true);
                    }
                })
            }
        }
    }
    /**
     * 设置当前图片
     * @param {String|Number} selectedItem 当前图片link值（字符串）/index值（数字）
     */
    const setCurrentImage = function (selectedItem) {
        if (typeof selectedItem === "string") {
            currentImageIndex.value = linkIndexMap[selectedItem];
        }
        else if (typeof selectedItem === "number") {
            currentImageIndex.value = selectedItem;
        }
        else return;
        var list = galleryImageList.value,
            i = currentImageIndex.value,
            currentImage = list[i];
        if (currentImage) {
            //当前图片设置current属性，同时移除pre，next
            currentImage.current = true;
            currentImage.pre = false;
            currentImage.next = false;
            //前一张图片设置pre属性同时移除current，next，如果有的话
            if (i > 0) {
                var preImage = list[i - 1];
                preImage.pre = true;
                preImage.current = false;
                preImage.next = false;
            }
            //前一张图片的再前一张清除状态
            if (i > 1) {
                var prePreImage = list[i - 2];
                prePreImage.pre = false;
                prePreImage.current = false;
                prePreImage.next = false;
            }
            //后一张图片设置next属性同时移除current，pre，如果有的话
            if (i < galleryItemCount.value - 1) {
                var nextImage = list[i + 1];
                nextImage.next = true;
                nextImage.current = false;
                nextImage.pre = false;
            }
            //后一张图片的再后一张清除状态
            if (i < galleryItemCount.value - 2) {
                var nextNextImage = list[i + 2];
                nextNextImage.next = false;
                nextNextImage.current = false;
                nextNextImage.pre = false;
            }
        }
    }
    /**
     * 切换画廊可见性
     * @param {Boolean} status 目标状态
     */
    const switchGalleyVisible = function (status) {
        galleryVisible.value = status;
        if (!status) {
            //关闭画廊时清除状态
            var list = galleryImageList.value,
                i = currentImageIndex.value,
                currentImage = list[i],
                preImage = list[i - 1],
                nextImage = list[i + 1];
            currentImage.current = false;
            if (preImage) preImage.pre = false;
            if (nextImage) nextImage.next = false;
        }
    }
    /**
     * 查看下一张图片
     */
    const moveToNext = function () {
        if (currentImageIndex.value < galleryItemCount.value - 1) {
            setCurrentImage(currentImageIndex.value + 1);
        }
    }

    /**
     * 查看上一张图片
     */
    const moveToPre = function () {
        if (currentImageIndex.value > 0) {
            setCurrentImage(currentImageIndex.value - 1);
        }
    }

    return {
        galleryImageList,
        galleyRequired,
        galleryVisible,
        currentImageIndex,
        generateGalleryImageList,
        setCurrentImage,
        switchGalleyVisible,
        moveToNext,
        moveToPre
    }
}
