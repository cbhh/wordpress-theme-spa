import { ref } from "vue";
import PostListItem from "@/context/post-list/postListItem";
import { PostListItemType } from "@/components/props";
import stores from "@/stores";
/**
 * 根据API返回数据生成组件可用的post列表
 */
export default function () {
    const postList = ref<PostListItemType[]>([]);
    //初始化store
    const { useTagStore, useCategoryStore } = stores,
        tagStore = useTagStore(),
        categoryStore = useCategoryStore();
    /**
     * 生成post列表
     * @param data API返回data
     */
    const generateList = function (data: PostListItem[]) {
        const tempList: PostListItemType[] = [];
        data.forEach(function (item) {
            const meta: PostListItemType = {
                id: item.id,
                thumbnail: item.featured_image_url || "",
                date: item.date,
                title: item.title.rendered,
                excerpt: item.excerpt.rendered,
                category: [],
                tag: [],
            },
                category = item.categories.map(function (c) {
                    const catMeta = categoryStore.categoryList.find(
                        (v) => v.id === c
                    );
                    return {
                        id: c,
                        slug: (catMeta && catMeta.slug) || "",
                        name: (catMeta && catMeta.name) || "",
                    };
                }),
                tag = item.tags.map(function (t) {
                    const tagMeta = tagStore.tagList.find((v) => v.id === t);
                    return {
                        id: t,
                        slug: (tagMeta && tagMeta.slug) || "",
                        name: (tagMeta && tagMeta.name) || "",
                    };
                });
            meta.category = category;
            meta.tag = tag;
            tempList.push(meta);
        });
        postList.value = tempList;
    };
    return {
        postList,
        generateList,
    };
}
