import { createStore } from "vuex";
import tags from "./modules/tags";
import categories from "./modules/categories";
import breadcrumb from "./modules/breadcrumb";

export default createStore({
    modules: {
        tags,
        categories,
        breadcrumb
    }
})