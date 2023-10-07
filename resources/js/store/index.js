import userStore from "./modules/user";
import blogStore from "./modules/blog";
import Vuex from "vuex";
import { localStoragePlugin } from "../plugin";

export default new Vuex.Store({
    modules: {
        blog: blogStore,
        user: userStore,
    },
    plugins: [localStoragePlugin],
});
