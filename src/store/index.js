import { createStore } from "vuex";
import tags from "./modules/tags";
import categories from "./modules/categories";
import breadcrumb from "./modules/breadcrumb";
import post from "./modules/post";

export default createStore({
    modules: {
        tags,
        categories,
        breadcrumb,
        post
    }
})