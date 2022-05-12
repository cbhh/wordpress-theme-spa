import Gallery from "./Gallery.vue";

export default {
    install: function (app, options) {
        app.component("post-gallery", Gallery);
    }
}
/**
 * GalleryItem数据结构
 */
export function GalleryItemDataType() { }
GalleryItemDataType.prototype = {
    /**
     * 随机字符串，用来与post中的img标签建立一对一的联系
     */
    imgLink: "",
    /**
     * src
     */
    src: "",
    /**
     * srcset
     */
    srcset: "",
    /**
     * 是否当前选中图片
     */
    current: false,
    /**
     * 是否是当前图片的上一张图片（针对图片所处位置，不是针对用户选择顺序）
     */
    pre: false,
    /**
     * 是否是当前图片的下一张图片（针对图片所处位置，不是针对用户选择顺序）
     */
    next: false,
    /**
     * 描述性信息
     */
    description: ""
}