/**
 * 站点及rest api配置信息
 */
export default {
    /**
     * 本站点标题（显示在浏览器标签上的）
     */
    siteTitle: "小流星的梦",
    /**
     * 本站点描述（meta标签里的，用于搜索引擎优化）
     */
    siteDescription: "主题SPA版本开发测试",
    /**
     * 站点图标URL（显示在浏览器标签上的）
     */
    siteIcon: "http://localhost:2222/wp-content/uploads/2022/03/cropped-6b6fec0efd8b0e996cb4f1ae7842571b-Mini.png",
    /**
     * 站点logo URL
     */
    siteLogo: "http://localhost:2222/wp-content/uploads/2022/04/cropped-6b6fec0efd8b0e996cb4f1ae7842571b.png",
    /**
     * 本站点URL，非API URL
     */
    siteUrl: "http://localhost:3000",
    /**
     * API基准URL
     */
    apiBaseUrl: "http://localhost:2222/wp-json/wp/v2/",
    /**
     * 访问wordpress rest api的用户名，
     * 与应用程序密码同在wordpress个人资料里设置
     */
    apiUser: "debugger",
    /**
     * 应用程序密码，用来授权对wordpress rest api的访问
     */
    appPwd: "gxYX wxyy aSQJ tAEI 5NyB AarZ",
    /**
     * 链接结构，参考wordpress设置中“固定链接”
     * 
     * 默认为y-m-postname
     * 
     * 供选择的用来组合URL的子项：
     * y:年，
     * m:月，
     * d:日，
     * postname:文章名称，
     * postid:文章ID
     */
    urlPattern: "y-m-postname",
    /**
     * 隐藏无内容的分类，默认true，即隐藏
     */
    hideEmptyCategory: true,
    /**
     * 隐藏无内容的标签，默认true，即隐藏
     */
    hideEmptyTag: true,
    /**
     * 标签文字尺寸（单位rem，网页文字默认1rem），不填写即所有标签文字都一样大小
     * 
     * 最小值不应小于0.4，最大值不应大于2
     */
    tagFontSize: {
        /**
         * 拥有项目最少的标签，填写0即不设置尺寸
         * 
         * 该值不应小于0.4
         */
        min: 0.6,
        /**
         * 拥有项目最多的标签，填写0即不设置尺寸
         * 
         * 该值不应大于2
         */
        max: 1.2
    },
    /**
     * 背景图片设置
     */
    background: {
        /**
         * 图片URL
         */
        image: "http://localhost:2222/wp-content/uploads/2022/04/e7fe136e453e68f2e25993593199be10.jpg",
        /**
         * 图片位置
         */
        position: {
            /**
             * 水平方向，可选值：left，center，right
             */
            horizontal: "center",
            /**
             * 垂直方向，可选值：top，center，bottom，
             */
            vertical: "center"
        },
        /**
         * 图片尺寸，可选值：unset（原始）、contain（适合屏幕）、cover（填满屏幕）
         */
        size: "cover",
        /**
         * 重复背景图片，默认false，即不重复
         */
        repeat: false,
        /**
         * 图片随页面滚动，默认false，即不滚动
         */
        scroll: false
    }
}