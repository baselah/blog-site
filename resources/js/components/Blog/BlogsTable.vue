<template>
    <div>
        <success-message :message="successMessage" />
        <div
            class="d-flex justify-content-between align-items-center mb-3 mr-5 ml-5 mt-3"
        >
            <!-- Create New Subscriber button -->
            <button class="btn btn-success" @click="openCreateDialog">
                Create New Blog
            </button>
            <div class="input-group ml-5">
                <span class="input-group-text">Search by title</span>
                <input
                    id="search"
                    type="text"
                    aria-label="title"
                    class="form-control"
                    v-model="search"
                />
            </div>
        </div>

        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(blog, index) in blogs" :key="index">
                    <td>{{ blog.id }}</td>
                    <td>{{ blog.title }}</td>
                    <td>{{ blog.status }}</td>
                    <td>{{ blog.date }}</td>
                    <td>
                        <img
                            :src="blog.image"
                            alt="blog image"
                            class="blog-image"
                        />
                    </td>
                    <td>
                        <button
                            class="btn btn-primary mr-5"
                            @click="openEditDialog(blog)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-danger"
                            @click="this.deleteBlog(blog.id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <edit-dialog
        :visible="isDialogVisible"
        :isCreateMode="isCreateMode"
        :formData="editedBlog"
        @close-dialog="closeDialog"
        @create-blog="handleBlogCreated"
        @update-blog="handleBlogUpdated"
    ></edit-dialog>
</template>
<script>
import EditDialog from "./FormBlog.vue";
import { mapState, mapActions } from "vuex";
export default {
    watch: {
        search: function (newSearch) {
            this.fetchBlogs(this.search);
        },
    },
    computed: {
        ...mapState(["blogs"]), // Use Vuex mapState to access the blogs state
    },
    components: {
        EditDialog, // Register the EditDialog component
    },
    data() {
        return {
            search: "",
            isDialogVisible: false,
            isCreateMode: false,
            editedBlog: {},
            isBlogUpdated: false,
            successMessage:""
        };
    },
    methods: {
        ...mapActions(["fetchBlogs","deleteBlog"]),
        handleBlogCreated(newBlog) {
            this.blogs.push(newBlog);
            this.isBlogUpdated = true;
        },
        handleBlogUpdated(updatedBlog) {
            console.log(updatedBlog);
            this.isBlogUpdated = true;
            this.blogs = this.blogs.map((s) => {
                if (s.id === updatedBlog.id) {
                    return updatedBlog; // Replace the subscriber with updated data
                }
                return s;
            });
        },
        openEditDialog(blog) {
            this.editedBlog = { ...blog };
            this.isCreateMode = false; // Set to false for edit mode
            this.isDialogVisible = true;
        },
        openCreateDialog() {
            this.editedBlog = {}; // Clear the edited subscriber data
            this.isCreateMode = true; // Set to true for create mode
            this.isDialogVisible = true;
        },
        closeDialog() {
            this.isDialogVisible = false;
        },
        // Fetch subscribers data using Axios
        // fetchBlogs() {
        //     axios
        //         .get("/api/blogs", { params: { search: this.search } })
        //         .then((response) => {
        //             this.blogs = response.data.blogs.data;
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // },
        // Soft delete a blog
    },
    mounted() {
        // Fetch blogs data when the component is mounted
        this.fetchBlogs();
    },
};
</script>

<style>
.blog-image {
    max-width: 100px; /* Adjust the width as needed */
    max-height: 100px; /* Adjust the height as needed */
}
</style>
