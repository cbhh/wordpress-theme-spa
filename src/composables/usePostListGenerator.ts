import { ref } from "vue";
import PostListItem from "@/context/post-list/postListItem";
import { PostListItemType } from "@/components/props";
import stores from "@/stores";
const { useTagStore, useCategoryStore } = stores;
/**
 * 根据API返回数据生成组件可用的post列表
 */
export default function () {
    const postList = ref<PostListItemType[]>([]);
    //初始化store
    const tagStore = useTagStore(),
        categoryStore = useCategoryStore();
    /**
     * 从本地store中查询单个post的category和tag详情
     * @param item 
     */
    const queryMeta = async function (item: PostListItem) {
        const meta: PostListItemType = {
            id: item.id,
            thumbnail: item.featured_image_url || "",
            date: item.date,
            title: item.title.rendered,
            excerpt: item.excerpt.rendered,
            category: [],
            tag: [],
        },
            category = item.categories.map(async function (c) {
                const catMeta = await categoryStore.getCategoryDetailByIdAsync(c);
                return {
                    id: c,
                    slug: (catMeta && catMeta.slug) || "",
                    name: (catMeta && catMeta.name) || "",
                };
            }),
            tag = item.tags.map(async function (t) {
                const tagMeta = await tagStore.getTagDetailByIdAsync(t);
                return {
                    id: t,
                    slug: (tagMeta && tagMeta.slug) || "",
                    name: (tagMeta && tagMeta.name) || "",
                };
            });
        meta.category = await Promise.all(category);
        meta.tag = await Promise.all(tag);
        return meta;
    };
    /**
     * 生成post列表
     * @param data API返回data
     */
    const generateList = async function (data: PostListItem[]) {
        const tempList: PostListItemType[] = [];
        //data.forEach(async (item) => tempList.push(await queryMeta(item)));
        for await (const i of data) {
            tempList.push(await queryMeta(i));
        }
        postList.value = tempList;
    };
    return {
        postList,
        queryMeta,
        generateList,
    };
}
