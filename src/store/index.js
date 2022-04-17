import { createStore } from "vuex";
import tags from "./modules/tags";
import categories from "./modules/categories";

export default createStore({
    modules: {
        tags,
        categories
    }
})