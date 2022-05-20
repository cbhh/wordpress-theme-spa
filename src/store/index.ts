import { InjectionKey } from "vue";
import { createStore, Store, useStore } from "vuex";
import RootStateTypes from "./i";
import CategoryModuleTypes from "./modules/category/i";
import categoryModule from "./modules/category";
import TagModuleTypes from "./modules/tag/i";
import tagModule from "./modules/tag";

export default createStore<RootStateTypes>({
    state: {
        //RootStateTypes中定义的state
    },
    modules: {
        categoryModule,
        tagModule,
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
}
export const key: InjectionKey<Store<RootStateTypes>> = Symbol("app");
/**
 * 导出含有类型提示的store对象
 */
export function appUseStore<T = AllStateTypes>() {
    return useStore<T>(key);
}
