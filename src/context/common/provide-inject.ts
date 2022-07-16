import { InjectionKey } from "vue";

/**
 * 注入站点元信息
 */
export interface SiteMeta {
    title: string;
    logo: string;
    description: string;
    home: string;
}

export const injectKeySiteMeta: InjectionKey<SiteMeta> = Symbol();
