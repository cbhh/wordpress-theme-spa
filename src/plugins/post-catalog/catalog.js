import Catalog from "./Catalog.vue";

export default {
    install: function (app, options) {
        app.component("catalog", Catalog);
    }
}
/**
 * CatalogItem数据结构
 */
export function CatalogItemDataType() { }
CatalogItemDataType.prototype = {
    /**
     * 文章内容
     */
    text: "",
    /**
     * 对应heading等级：2-6
     */
    level: 0,
    /**
     * 链接
     */
    href: "",
    /**
     * 是否当前选中
     */
    current: false,
    /**
     * 锚点字符串，用来与heading标签建立一对一的联系
     */
    anchor: ""
}