import { defineStore } from "pinia";
import getCategoryList from "@/apis/getCategoryList";
import CategoryStateTypes, {
    CategoryTree,
    OriginCategoryListItem,
} from "./i";
/**
 * Category存储
 */
export default defineStore("category", {
    state: (): CategoryStateTypes => ({
        categoryList: [],
        hierarchicCategoryList: [],
    }),
    //getters本质为计算属性，所以无法传递参数，只能返回一个可以接收参数的函数
    //https://pinia.vuejs.org/core-concepts/getters.html#passing-arguments-to-getters
    getters: {
        /**
         * 根据slug获取category详情
         * @param state
         */
        getCategoryDetailBySlug: (
            state
        ): ((slug: string) => OriginCategoryListItem | undefined) => {
            return (categorySlug: string) =>
                state.categoryList.find((item) => item.slug === categorySlug);
        },
        /**
         * 根据id获取category详情
         * @param state
         */
        getCategoryDetailById: (
            state
        ): ((id: number) => OriginCategoryListItem | undefined) => {
            return (categoryId: number) =>
                state.categoryList.find((item) => item.id === categoryId);
        },
    },
    actions: {
        storeCategoryList (data: OriginCategoryListItem[]) {
            this.categoryList = data;
            const flat: OriginCategoryListItem[] = data,
                /**
                 * 层次列表数组
                 */
                hierarchic: CategoryTree[] = [],
                /**
                 * 顶层节点集合
                 */
                topNodes = new Set<CategoryTree>(),
                /**
                 * 相同parent的节点归为一组
                 */
                group = new Map<number, CategoryTree[]>(),
                /**
                 * 所有子树
                 */
                allSubTrees: CategoryTree[] = [];
            flat.forEach(function (item) {
                const itemCopy = {
                        id: item.id,
                        count: item.count,
                        name: item.name,
                        slug: item.slug,
                        children: [] as CategoryTree[],
                    },
                    /**
                     * item parent id
                     */
                    p = item.parent;
                if (p === 0) {
                    topNodes.add(itemCopy);
                } else {
                    const specificParentGroup = group.get(p);
                    if (specificParentGroup) {
                        specificParentGroup.push(itemCopy);
                    } else {
                        const newGroup = [itemCopy];
                        group.set(p, newGroup);
                    }
                }
            });
            //检查topNodes集合，没有子节点的项添加进hierarchic数组
            topNodes.forEach(function (t) {
                if (group.has(t.id)) {
                    hierarchic.push(t);
                }
            });
            //迭代group map生成子树，子树根节点为group map key值，即共同的parent节点
            group.forEach(function (firstLvChildren, pid) {
                const rootNode = flat.find((v) => v.id === pid);
                if (rootNode) {
                    const subTree = {
                        id: pid,
                        count: rootNode.count,
                        name: rootNode.name,
                        slug: rootNode.slug,
                        children: [] as CategoryTree[],
                    };
                    firstLvChildren.forEach(function (child) {
                        subTree.children.push({
                            id: child.id,
                            count: child.count,
                            name: child.name,
                            slug: child.slug,
                            children: [],
                        });
                    });
                    allSubTrees.push(subTree);
                }
            });
            //挂载子树至其父节点的children属性下
            allSubTrees.forEach(function (st) {
                const p = flat.find((v) => v.id === st.id),
                    pid = p && p.parent;
                if (pid !== undefined) {
                    //子树不存在父节点，即该子树是顶层节点本身及其所有子节点的集合
                    if (pid === 0) {
                        hierarchic.push(st);
                    } else {
                        //子树存在父节点
                        const pnode = allSubTrees.find((v) => v.id === pid);
                        if (pnode) {
                            const childList = pnode.children,
                                //子树的children数组内容插入pnode下指定child的children数组中
                                specificChild = childList.find(
                                    (v) => v.id === st.id
                                );
                            if (specificChild) {
                                // Array.prototype.push.apply(
                                //     specificChild.children,
                                //     st.children
                                // );
                                specificChild.children.push(...st.children);
                            }
                        }
                    }
                }
            });
            //TODO:需要统计各节点的后代节点数量，wordpress api返回的count仅仅包含自身的数量，不包含子孙节点的数量
            const gather = function (node: CategoryTree) {
                let total = node.count;
                node.children.forEach(function (child) {
                    gather(child);
                    total += child.count;
                });
                node.count = total;
            };
            for (const item of hierarchic) {
                gather(item);
            }
            this.hierarchicCategoryList = hierarchic;
        },
        /**
         * 获取扁平category列表
         */
        async getCategorylist () {
            const res = await getCategoryList();
            if (res) {
                this.storeCategoryList(res.result);
            }
        }
    },
});
