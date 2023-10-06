import { createStore } from "vuex";
import axios from "axios";
// Create a new Vuex store instance
export default createStore({
    namespaced: true,
    state: {
        // Define your application's state here
        // Example:
        blogs: [],

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
        // Define functions to modify the state
        // Example:
        setBlogs(state, blogs) {
            state.blogs = blogs;
        },
        addBlog(state, blog) {
            state.blogs.push(blog);
        },
        updateBlog(state, updatedBlog) {
            const index = state.blogs.findIndex(
                (blog) => blog.id === updatedBlog.id
            );
            if (index !== -1) {
                // Replace the existing blog with the updated data
                state.blogs.splice(index, 1, updatedBlog);
            }
        },
        deleteBlog(state, blogId) {
            const index = state.blogs.findIndex((blog) => blog.id === blogId);
            if (index !== -1) {
                state.blogs.splice(index, 1);
            }
        },
    },
    actions: {
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
                commit("setUser", user);
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
        // Define actions that can trigger mutations
        // Example:
        async fetchBlogs({ commit }, search) {
            try {
                // Use Axios to fetch blogs with the search parameter
                const response = await axios.get("/api/blogs", {
                    params: { search: search },
                });
                const blogs = response.data.blogs.data;

                // Commit a mutation to update the state with the fetched blogs
                commit("setBlogs", blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        },
        async createBlog({ commit }, newBlogData) {
            try {
                // Make an API request to create the blog
                const response = await axios.post("/api/blogs", newBlogData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // Commit the mutation to add the new blog to the state
                commit("addBlog", response.data.blog);
            } catch (error) {
                console.error("Error creating blog:", error);
                throw error;
            }
        },
        async updateBlog({ commit }, updatedBlogData) {
            try {
                // Make an API request to update the blog
                const response = await axios.put(
                    `/api/blogs/${updatedBlogData.id}`,
                    updatedBlogData
                );
                // Commit the mutation to update the blog in the state
                commit("updateBlog", response.data.blog);
            } catch (error) {
                console.error("Error updating blog:", error);
                throw error;
            }
        },
        async deleteBlog({ commit }, blogId) {
            try {
                // Make an API request to delete the blog
                await axios.delete(`/api/blogs/${blogId}`);

                // Commit the mutation to delete the blog from the state
                commit("deleteBlog", blogId);
            } catch (error) {
                console.error("Error deleting blog:", error);
                throw error;
            }
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user && !!state.token,

        getBlogById: (state) => (id) => {
            // Log the ID to ensure it's being passed correctly
            console.log("ID:", id);

            // Find the blog post in the state by its ID
            const blog = state.blogs.find((blog) => blog.id === id);

            // Log the retrieved blog data
            console.log("Blog Data:", blog);

            return blog;
        },
    },


});
