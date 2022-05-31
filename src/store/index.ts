import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import RootStateTypes from "./i";
import CategoryModuleTypes from "./modules/category/i";
import categoryModule from "./modules/category";
import TagModuleTypes from "./modules/tag/i";
import tagModule from "./modules/tag";
import UserModuleTypes from "./modules/user/i";
import userModule from "./modules/user";
import PageMetaModuleTypes from "./modules/page-meta/i";
import pageMetaModule from "./modules/page-meta";
import BreadcrumbModuleTypes from "./modules/breadcrumb/i";
import breadcrumbModule from "./modules/breadcrumb";

export default createStore<RootStateTypes>({
    state: {
        //RootStateTypes中定义的state
        ver: "0.21",
    },
    modules: {
        categoryModule,
        tagModule,
        userModule,
        pageMetaModule,
        breadcrumbModule,
    },
});
export interface AllStateTypes extends RootStateTypes {
    /**
     * category(目录)存储
     */
    categoryModule: CategoryModuleTypes;
    /**
     * tag(标签)存储
     */
    tagModule: TagModuleTypes;
    /**
     * user(用户)存储
     */
    userModule: UserModuleTypes;
    /**
     * 页面元信息，显示在landing组件上
     */
    pageMetaModule: PageMetaModuleTypes;
    /**
     * 面包屑导航列表数据
     */
    breadcrumbModule: BreadcrumbModuleTypes;
}
export const key: InjectionKey<Store<RootStateTypes>> = Symbol("app");
/**
 * 导出含有类型提示的store对象
 */
export function appUseStore<T = AllStateTypes>() {
    return useStore<T>(key);
}
