import { ref } from "vue";
import CategoryListItem from "@/context/category-list/categoryListItem";
import TagListItem from "@/context/tag-list/tagListItem";
import PostListItem from "@/context/post-list/postListItem";
import { PostListItemType } from "@/components/props";
/**
 * 根据API返回数据生成组件可用的post列表
 */
export default function () {
    const postList = ref<PostListItemType[]>([]);
    /**
     * 生成post列表
     * @param allCategories 所有category列表
     * @param allTags 所有tag列表
     * @param data API返回data
     */
    const generateList = function (
        allCategories: CategoryListItem[],
        allTags: TagListItem[],
        data: PostListItem[]
    ) {
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
                    const catMeta = allCategories.find((v) => v.id === c);
                    return {
                        id: c,
                        slug: (catMeta && catMeta.slug) || "",
                        name: (catMeta && catMeta.name) || "",
                    };
                }),
                tag = item.tags.map(function (t) {
                    const tagMeta = allTags.find((v) => v.id === t);
                    return {
                        id: t,
                        slug: (tagMeta && tagMeta.slug) || "",
                        name: (tagMeta && tagMeta.name) || "",
                    };
                });
            meta.category = category;
            meta.tag = tag;
            postList.value.push(meta);
        });
    };
    return {
        postList,
        generateList,
    };
}
