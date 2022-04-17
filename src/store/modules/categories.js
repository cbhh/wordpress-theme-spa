const state = () => ({
    categoryList: [],
    hierarchicCategoryList: []
})

const mutations = {
    storeCategoryList(state, data) {
        state.categoryList = data;
        /**
         * @type [{"id":Number,"count":Number,"name":String,"slug":String,"parent":Number}]
         */
        const flat = state.categoryList,
            hierarchic = [], topNodes = [],
            //相同parent的节点归为一组
            group = {},
            /**
             * 所有子树
             */
            allSubTrees = [];
        flat.forEach(function (item) {
            var itemCopy = {
                id: item.id,
                count: item.count,
                name: item.name,
                slug: item.slug,
                children: []
            },
                p = item.parent;
            if (p === 0) {
                topNodes.push(itemCopy);
            } else {
                if (group[p]) {
                    group[p].push(itemCopy);
                } else {
                    group[p] = [itemCopy];
                }
            }
        });
        //检查topNodes数组，没有子节点的项添加进hierarchic数组
        topNodes.forEach(function (t) {
            if (!Object.prototype.hasOwnProperty.call(group, t.id)) {
                hierarchic.push(t);
            }
        });
        //迭代group对象生成子树，子树根节点为group对象key值，即共同的parent节点
        Object.keys(group).forEach(function (k) {
            var kn = parseInt(k);
            var rootNode = flat.find(v => v.id === kn),
                subTree = {
                    id: kn,
                    count: rootNode.count,
                    name: rootNode.name,
                    slug: rootNode.slug,
                    children: []
                },
                childNodes = group[k];
            childNodes.forEach(function (child) {
                subTree.children.push({
                    id: child.id,
                    count: child.count,
                    name: child.name,
                    slug: child.slug,
                    children: []
                })
            });
            allSubTrees.push(subTree);
        });
        //挂载子树至其父节点的children属性下
        allSubTrees.forEach(function (st) {
            var pid = flat.find(v => v.id === st.id)["parent"];
            //子树不存在父节点，即该子树是顶层节点本身及其所有子节点的集合
            if (pid === 0) {
                hierarchic.push(st);
            } else {
                //子树存在父节点
                var pnode = allSubTrees.find(v => v.id === pid),
                    childList = pnode.children,
                    //子树的children数组内容插入pnode下指定child的children数组中
                    specificChild = childList.find(v => v.id === st.id);
                Array.prototype.push.apply(specificChild.children, st.children);
            }
        });
        state.hierarchicCategoryList = hierarchic;
    }
}

export default {
    state,
    mutations
}