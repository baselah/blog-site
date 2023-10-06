import { createStore } from "vuex";
import axios from "axios";




export default createStore({
    namespaced: true,
    state: {
        user: null, // Initially, the user is null
        token: null, // Initially, the token is null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        clearAuthData(state) {
            state.user = null;
            state.token = null;
        },
    },
    actions: {
        // Implement your login action here
        async login({ commit }, { user_name, password }) {
            try {
                // Make the API call to your login endpoint
                const response = await axios.post("/api/login", {
                    user_name,
                    password,
                });

                // Extract user data and token from the response
                const { user, token } = response.data;

                // Store user data and token in the Vuex store
                commit('setUser', user);
                commit('setToken', token);

                // Redirect to another page or perform additional actions
            } catch (error) {
                // Handle login error (e.g., display error message)
                console.error(error);
            }
        },

        // Implement your logout action here
        logout({ commit }) {
            // Clear user data and token in the Vuex store
            commit('clearAuthData');
        },
    },
    getters: {
        //isAuthenticated: state => !!state.user && !!state.token,
    },
});
