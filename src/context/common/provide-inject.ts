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
/**
 * 注入窗口在xy两个方向的滚动距离以及长宽值
 */
export interface WindowScrollValues {
    x: number;
    y: number;
    w: number;
    h: number;
}

export const injectKeySiteMeta: InjectionKey<SiteMeta> = Symbol();
export const injectKeyWindowScrollValues: InjectionKey<WindowScrollValues> = Symbol();
