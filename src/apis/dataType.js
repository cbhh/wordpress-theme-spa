/**
 * PostDetail数据结构
 */
export function PostDetail() { }
/**
 * ApiList数据结构
 */
export function ApiList() { }
/**
 * UserDetail数据结构
 */
export function UserDetail() { }
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
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    post: function () { },
    /**
     * 获取单个post
     * @param  {Number} id 传递给endpoint的参数：post ID
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    postDetail: function (id) { },
    /**
     * 获取tag列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    tag: function () { },
    /**
     * 获取category列表
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    category: function () { },
    /**
     * 获取站点设置
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    setting: function () { },
    /**
     * 获取用户信息
     * @param  {Number} id 传递给endpoint的参数：用户ID
     * @returns {Promise<any>} 发送GET请求的promise对象
     */
    userDetail: function (id) { }
}
UserDetail.prototype = {
    /**
     * user id
     */
    id: 0,
    /**
     * 显示名称
     */
    name: "",
    /**
     * 别名
     */
    slug: "",
    /**
     * 用户描述
     */
    description: "",
    /**
     * 头像URL
     */
    avatar_urls: {
        24: "",
        48: "",
        96: ""
    }
}
