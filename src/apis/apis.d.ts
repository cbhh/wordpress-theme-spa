/**
 * 站点设置pattern
 */
export declare interface SettingDetail {
    /**
     * 站点标题（用户在wordpress后台主题自定义中设置的）
     */
    title: string;
    /**
     * 站点描述（用户在wordpress后台主题自定义中设置的）
     */
    description: string;
    /**
     * 站点logo图片id
     */
    site_logo: number;
}
/**
 * 文章详情pattern
 */
export declare interface PostDetail {
    /**
     * 文章 id
     */
    id: number;
    /**
     * 发布日期
     */
    date: string;
    /**
     * 修改日期
     */
    modified: string;
    /**
     * 标题
     */
    title: { rendered: string };
    /**
     * 作者id
     */
    author: number;
    /**
     * 特色图片id
     */
    featured_media: 0;
    /**
     * 分类id数组
     */
    categories: number[];
    /**
     * 标签id数组
     */
    tags: number[];
    /**
     * 特色图片URL，若不存在特色图片则返回false
     */
    featured_image_url: string | false;
    /**
     * 内容HTML字符串
     */
    content: { rendered: string };
}
/**
 * 用户详情pattern
 */
export declare interface UserDetail {
    /**
     * 用户 id
     */
    id: number;
    /**
     * 显示名称
     */
    name: string;
    /**
     * 别名
     */
    slug: string;
    /**
     * 用户描述
     */
    description: string;
    /**
     * 头像URL
     */
    avatar_urls: {
        24: string;
        48: string;
        96: string;
    };
}
/**
 * 文章列表项pattern
 */
export declare interface PostListItem {
    /**
     * 文章 id
     */
    id: number;
    /**
     * 创建日期
     */
    date: string;
    /**
     * 修改日期
     */
    modified: string;
    /**
     * 别名
     */
    slug: string;
    /**
     * 标题
     */
    title: { rendered: string };
    /**
     * 摘要
     */
    excerpt: {
        /**
         * HTML字符串
         */
        rendered: string;
        protected: boolean;
    };
    /**
     * 作者id
     */
    author: number;
    /**
     * 特色图片id
     */
    featured_media: number;
    /**
     * 分类id数组
     */
    categories: number[];
    /**
     * 标签id数组
     */
    tags: number[];
    /**
     * 特色图片URL，若不存在特色图片则返回false
     */
    featured_image_url: string | false;
}
/**
 * 分类列表项pattern
 */
export declare interface CategoryListItem {
    /**
     * 分类 id
     */
    id: number;
    /**
     * 拥有的post数量
     */
    count: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 别名
     */
    slug: string;
    /**
     * 父级分类id
     */
    parent: number;
}
/**
 * 标签列表项pattern
 */
export declare interface TagListItem {
    /**
     * 标签 id
     */
    id: number;
    /**
     * 拥有的post数量
     */
    count: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 别名
     */
    slug: string;
}
/**
 * 文章日期pattern
 */
export declare interface PostDate {
    id: number;
    /**
     * 文章日期，格式：yyyy-MM-ddThh:mm:ss
     */
    date: string;
}
/**
 * API列表
 */
export declare interface ApiList {
    /**
     * 获取文章列表
     * @param conditions 查询条件，传入一个键值对，默认按照wordpress规则返回最近10篇文章
     * @example 获取用户id为1且标签id为1的最近10篇文章
     * getPostList({tag:1, author:1}).then((data)=>{...})
     */
    getPostList(conditions?: { [key: string]: string | number }): Promise<{
        totalItems: number;
        totalPages: number;
        result: PostListItem[];
    }>;
    /**
     * 获取指定日期范围内的文章ID列表
     * @param range [起始日期 yyyy-MM-dd表示法,结束日期 yyyy-MM-dd表示法]
     * @example 获取2022年5月所有文章id
     * getPostIdListByDateRange(["2022-05-01","2022-05-31"]).then((data)={...})
     */
    getPostIdListByDateRange(range: [string, string]): Promise<{
        totalItems: number;
        totalPages: number;
        result: PostDate[];
    }>;
    /**
     * 获取指定文章
     * @param id 文章 id
     * @example getPostDetail(1).then((data)=>{...})
     */
    getPostDetail(id: number): Promise<PostDetail>;
    /**
     * 获取标签列表
     */
    getTagList(): Promise<{
        totalItems: number;
        totalPages: number;
        result: TagListItem[];
    }>;
    /**
     * 获取分类列表
     */
    getCategoryList(): Promise<{
        totalItems: number;
        totalPages: number;
        result: CategoryListItem[];
    }>;
    /**
     * 获取用户列表
     */
    getUserList(): Promise<{
        totalItems: number;
        totalPages: number;
        result: UserDetail[];
    }>;
    /**
     * 获取站点设置
     */
    getSiteSettings(): Promise<SettingDetail>;
}
