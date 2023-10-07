import axios from "axios";

export default {
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
            alert(error.response.data.message);
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
            alert(error.response.data.message);
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
            alert(error.response.data.message);

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
            alert(error.response.data.message);

            console.error("Error deleting blog:", error);
            throw error;
        }
    },
};
