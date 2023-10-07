import axios from "axios";

export default {
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
            commit("setUser", user.user_name);
            commit("setAuth", true);

            commit("setToken", token);

            // Redirect to another page or perform additional actions
        } catch (error) {
            // Handle login error (e.g., display error message)
            console.error(error);
            throw error;
        }
    },

    // Implement your logout action here
    logout({ commit }) {
        // Clear user data and token in the Vuex store
        commit("clearAuthData");
    },
};
