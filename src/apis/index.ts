import getCategoryList from "./getCategoryList";
import getPostDetail from "./getPostDetail";
import getPostList from "./getPostList";
import getTagList from "./getTagList";
import getUserList from "./getUserList";
import getSiteSettings from "./getSiteSettings";
import getPostIdListByDateRange from "./getPostIdListByDateRange";
import { ApiList } from "./apis";

export default {
    getCategoryList,
    getPostDetail,
    getPostList,
    getTagList,
    getUserList,
    getSiteSettings,
    getPostIdListByDateRange,
} as ApiList;
