export default {
    getBlogById: (state) => (id) => {
        // Log the ID to ensure it's being passed correctly
        console.log("ID:", id);

        // Find the blog post in the state by its ID
        const blog = state.blogs.find((blog) => blog.id === id);

        // Log the retrieved blog data
        console.log("Blog Data:", blog);

        return blog;
    },
};
