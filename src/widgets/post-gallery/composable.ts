import { ref, computed, watch } from "vue";
import { GalleryItemType } from "../props";

/**
 * 从dom上下文提取图片描述信息
 * @param pImg
 * @returns 图片描述信息，来自紧跟该image元素的figcaption元素或者alt数据
 */
function findImageDescription(pImg: HTMLImageElement) {
    if (pImg) {
        //查找figcaption
        if (pImg.parentElement && pImg.parentElement.tagName === "FIGURE") {
            var figcaption = pImg.nextElementSibling as HTMLElement | null;
            if (
                figcaption &&
                figcaption.tagName === "FIGCAPTION" &&
                figcaption.innerText
            ) {
                return figcaption.innerText;
            }
        }
        //查找alt
        return pImg.alt ? pImg.alt : "";
    }
}
/**
 * 批量设置图片状态
 * @param galleryImage
 * @param cur current状态
 * @param pre currentPre状态
 * @param next currentNext状态
 */
function setGalleryImageStatus(
    galleryImage: GalleryItemType,
    cur: boolean,
    pre: boolean,
    next: boolean
) {
    galleryImage.isCurrent = cur;
    galleryImage.isCurrentPre = pre;
    galleryImage.isCurrentNext = next;
}
/**
 * 生成图片画廊数据
 */
export default function () {
    /**
     * 图片列表
     */
    const galleryImageList = ref<GalleryItemType[]>([]),
        /**
         * 画廊可见性
         */
        galleryVisible = ref(false),
        /**
         * 当前选中的图片位置，从0开始，这里初始化为-1，方便watch侦听器运行
         */
        currentImageIndex = ref(-1);
    /**
     * 图片总数
     */
    const galleryItemCount = computed(() => galleryImageList.value.length),
        /**
         * 画廊是否需要
         */
        galleyRequired = computed(() => galleryItemCount.value > 0);
    //监听galley可见性变化
    watch(
        () => galleryVisible.value,
        (n, o) => {
            //visible:true->false
            if (!n && o) {
                //关闭画廊时清除状态
                var list = galleryImageList.value,
                    i = currentImageIndex.value,
                    currentImage = list[i],
                    preImage = list[i - 1],
                    nextImage = list[i + 1];
                currentImage.isCurrent = false;
                if (preImage) {
                    preImage.isCurrentPre = false;
                }
                if (nextImage) {
                    nextImage.isCurrentNext = false;
                }
            }
        }
    );
    //监听currentImageIndex变化
    watch(
        () => currentImageIndex.value,
        (n, o) => {
            if (n >= 0 && n < galleryItemCount.value) {
                setCurrentImage(n);
            }
        }
    );
    /**
     * 生成图片列表
     * @param contentRef 内容dom的引用
     */
    const generateGalleryImageList = function (contentRef: HTMLDivElement) {
        if (contentRef && contentRef instanceof HTMLDivElement) {
            var els = contentRef.getElementsByTagName("img"),
                count = els.length;
            for (var i = 0; i < count; i++) {
                var pImg = els.item(i) as HTMLImageElement;
                pImg.title = "在画廊中查看";
                pImg.dataset.imgIndex = i + "";
                galleryImageList.value.push({
                    imgIndex: i,
                    imgSrc: pImg.src,
                    imgSrcset: pImg.srcset,
                    isCurrent: false,
                    isCurrentPre: false,
                    isCurrentNext: false,
                    description: findImageDescription(pImg),
                });
                //img元素绑定点击事件
                pImg.addEventListener("click", function () {
                    if (!galleryVisible.value) {
                        var link = this.dataset.imgIndex as string;
                        currentImageIndex.value = parseInt(link);
                        galleryVisible.value = true;
                    }
                });
            }
        }
    };
    /**
     * 设置当前图片
     * @param selectedItemIndex 当前图片index值
     */
    const setCurrentImage = function (selectedItemIndex: number) {
        var list = galleryImageList.value,
            currentImage = list[selectedItemIndex];
        if (currentImage) {
            //当前图片设置current属性，同时移除pre，next
            setGalleryImageStatus(currentImage, true, false, false);
            //前一张图片设置pre属性同时移除current，next，如果有的话
            if (selectedItemIndex > 0) {
                var preImage = list[selectedItemIndex - 1];
                setGalleryImageStatus(preImage, false, true, false);
            }
            //前一张图片的再前一张清除状态
            if (selectedItemIndex > 1) {
                var prePreImage = list[selectedItemIndex - 2];
                setGalleryImageStatus(prePreImage, false, false, false);
            }
            //后一张图片设置next属性同时移除current，pre，如果有的话
            if (selectedItemIndex < galleryItemCount.value - 1) {
                var nextImage = list[selectedItemIndex + 1];
                setGalleryImageStatus(nextImage, false, false, true);
            }
            //后一张图片的再后一张清除状态
            if (selectedItemIndex < galleryItemCount.value - 2) {
                var nextNextImage = list[selectedItemIndex + 2];
                setGalleryImageStatus(nextNextImage, false, false, false);
            }
        }
    };

    return {
        galleryImageList,
        galleyRequired,
        galleryVisible,
        currentImageIndex,
        generateGalleryImageList,
        setCurrentImage,
    };
}
