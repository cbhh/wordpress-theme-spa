/**
 * PostDetail数据结构
 */
export function PostDetail() { }
/**
 * ApiList数据结构
 */
export function ApiList() { }
PostDetail.prototype = {
    /**
     * post id
     */
    "id": 0,
    /**
     * 发布日期
     */
    "date": "",
    /**
     * 修改日期
     */
    "modified": "",
    /**
     * 标题
     */
    "title": { "rendered": "" },
    /**
     * 作者id
     */
    "author": 0,
    /**
     * 特色图片id
     */
    "featured_media": 0,
    /**
     * 分类id数组
     * @type Array<Number>
     */
    "categories": [0],
    /**
     * 标签id数组
     * @type Array<Number>
     */
    "tags": [0],
    /**
     * 特色图片URL
     * @type String | Boolean
     */
    "featured_image_url": "",
    /**
     * 内容HTML字符串
     */
    "content": { "rendered": "" }
}
ApiList.prototype = {
    /**
     * 获取post列表
     * @param  {Array<String|Number>} param 传递给endpoint的参数列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    post: function (...param) { },
    /**
     * 获取单个post
     * @param  {Array<String|Number>} param 传递给endpoint的参数列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    postDetail: function (...param) { },
    /**
     * 获取tag列表
     * @param  {Array<String|Number>} param 传递给endpoint的参数列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    tag: function (...param) { },
    /**
     * 获取category列表
     * @param  {Array<String|Number>} param 传递给endpoint的参数列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    category: function (...param) { },
    /**
     * 获取站点设置
     * @param  {Array<String|Number>} param 传递给endpoint的参数列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    setting: function (...param) { },
}
