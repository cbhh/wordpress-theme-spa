import { ref } from "vue";
import { TagListItem, CategoryListItem, PostListItem } from "../apis/dataType";

/**
 * 根据API返回数据生成组件可用的post列表
 */
export default function () {
    const postList = ref([]);
    /**
     * 生成post列表
     * @param {Array<CategoryListItem>} allCategories 所有category列表
     * @param {Array<TagListItem>} allTags 所有tag列表
     * @param {Array<PostListItem>} data API返回data
     */
    const generateList = function (allCategories, allTags, data) {
        data.forEach(function (item) {
            var meta = {
                id: item.id,
                thumbnail: item.featured_image_url || "",
                date: item.date,
                title: item.title.rendered,
                excerpt: item.excerpt.rendered,
            },
                category = item.categories.map(function (c) {
                    var catMeta = allCategories.find((v) => v.id === c);
                    return {
                        id: c,
                        slug: catMeta.slug,
                        name: catMeta.name,
                    };
                }),
                tag = item.tags.map(function (t) {
                    var tagMeta = allTags.find((v) => v.id === t);
                    return {
                        id: t,
                        slug: tagMeta.slug,
                        name: tagMeta.name,
                    };
                });
            meta["category"] = category;
            meta["tag"] = tag;
            postList.value.push(meta);
        });
    }
    return {
        postList,
        generateList
    }
}