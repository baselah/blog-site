
import Vuex from "vuex";
import userStore from "./userStore";
import blogStore from "./blogStore";
// Create a new Vuex store instance


const store = new Vuex.Store({
    namespaced:true,
    modules: {
        blog: blogStore,
        user: userStore,
    },
});

export default store;
