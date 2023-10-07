export default {
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
};
