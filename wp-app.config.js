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
    urlPattern: "y-m-postname"
}