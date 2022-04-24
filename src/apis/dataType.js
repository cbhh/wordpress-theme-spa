//js声明API返回数据类型结构
/**
 * ApiList数据结构
 */
export function ApiList() { }
/**
 * SettingDetail数据结构
 */
function SettingDetail() { }
/**
 * PostDetail数据结构
 */
function PostDetail() { }
/**
 * UserDetail数据结构
 */
function UserDetail() { }
/**
 * PostListItem数据结构
 */
export function PostListItem() { }
/**
 * TagListItem数据结构
 */
export function TagListItem() { }
/**
 * CategoryListItem数据结构
 */
export function CategoryListItem() { }

ApiList.prototype = {
    /**
     * 获取post列表
     * @returns {Promise<Array<PostListItem>>} 
     * 发送GET请求的promise对象，该请求返回PostListItem对象数组
     */
    post: function () { },
    /**
     * 获取单个post
     * @param  {Number} id 传递给endpoint的参数：post ID
     * @returns {Promise<PostDetail>} 
     * 发送GET请求的promise对象，该请求返回PostDetail对象
     */
    postDetail: function (id) { },
    /**
     * 获取指定分类的文章列表
     * @param  {String} cats 传递给endpoint的参数：分类ID列表，用逗号隔开
     * @returns {Promise<Array<PostListItem>>} 
     * 发送GET请求的promise对象，该请求返回PostListItem对象数组
     */
    postCategory: function (cats) { },
    /**
     * 获取tag列表
     * @returns {Promise<Array<TagListItem>>} 
     * 发送GET请求的promise对象，该请求返回TagListItem对象数组
     */
    tag: function () { },
    /**
     * 获取category列表
     * @returns {Promise<Array<CategoryListItem>>} 
     * 发送GET请求的promise对象，该请求返回CategoryListItem对象数组
     */
    category: function () { },
    /**
     * 获取站点设置
     * @returns {Promise<SettingDetail>} 
     * 发送GET请求的promise对象，该请求返回SettingDetail对象
     */
    setting: function () { },
    /**
     * 获取用户信息
     * @param  {Number} id 传递给endpoint的参数：用户ID
     * @returns {Promise<UserDetail>} 
     * 发送GET请求的promise对象，该请求返回UserDetail对象
     */
    userDetail: function (id) { }
}
SettingDetail.prototype = {
    /**
     * 站点标题（用户在wordpress后台主题自定义中设置的）
     */
    "title": "",
    /**
     * 站点描述（用户在wordpress后台主题自定义中设置的）
     */
    "description": "",
    /**
     * 站点logo图片id
     */
    "site_logo": 0
}
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
     * 特色图片URL，若不存在特色图片则返回false
     * @type String | Boolean
     */
    "featured_image_url": "",
    /**
     * 内容HTML字符串
     */
    "content": { "rendered": "" }
}
UserDetail.prototype = {
    /**
     * user id
     */
    "id": 0,
    /**
     * 显示名称
     */
    "name": "",
    /**
     * 别名
     */
    "slug": "",
    /**
     * 用户描述
     */
    "description": "",
    /**
     * 头像URL
     */
    "avatar_urls": {
        24: "",
        48: "",
        96: ""
    }
}
PostListItem.prototype = {
    /**
     * post id
     */
    "id": 0,
    /**
     * 创建日期
     */
    "date": "",
    /**
     * 修改日期
     */
    "modified": "",
    /**
     * 别名
     */
    "slug": "",
    /**
     * 标题
     */
    "title": { "rendered": "" },
    /**
     * 摘要
     */
    "excerpt": { "rendered": "", "protected": false },
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
     * 特色图片URL，若不存在特色图片则返回false
     * @type String | Boolean
     */
    "featured_image_url": ""
}
CategoryListItem.prototype = {
    /**
     * category id
     */
    "id": 0,
    /**
     * 拥有的post数量
     */
    "count": 0,
    /**
     * 名称
     */
    "name": "",
    /**
     * 别名
     */
    "slug": "",
    /**
     * 父级分类id
     */
    "parent": 0
}
TagListItem.prototype = {
    /**
     * tag id
     */
    "id": 0,
    /**
     * 拥有的post数量
     */
    "count": 0,
    /**
     * 名称
     */
    "name": "",
    /**
     * 别名
     */
    "slug": "",
}