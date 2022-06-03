/* eslint-disable @typescript-eslint/naming-convention */
/**
 * 站点设置返回结果
 * @see [wordpress-rest-api-settings-schema](https://developer.wordpress.org/rest-api/reference/settings/#schema)
 */
export default interface SettingDetailResponse {
    /**
     * 站点标题（用户在wordpress后台主题自定义中设置的）
     */
    title: string;
    /**
     * 站点描述（用户在wordpress后台主题自定义中设置的）
     */
    description: string;
    /**
     * 站点logo图片ID
     */
    site_logo: number;
}
