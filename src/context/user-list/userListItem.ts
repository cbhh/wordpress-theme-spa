/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 用户列表项/用户详情
 * @see [wordpress-rest-api-users-schema](https://developer.wordpress.org/rest-api/reference/users/#schema)
 */
export default interface UserListItem {
    /**
     * 用户ID
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
