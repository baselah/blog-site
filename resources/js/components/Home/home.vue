<template>
    <div class="content-container">
        <div class="container text-left">
            <div class="row">
                <div
                    class="col-md-4"
                    v-for="(blog, index) in blogs"
                    :key="index"
                >
                    <div class="card">
                        <img
                            :src="blog.image"
                            class="card-img-top"
                            alt="Item image"
                            style="height: 250px"
                        />
                        <div class="card-body">
                            <h5 class="card-title">{{ blog.title }}</h5>
                            <router-link
                                :to="{
                                    name: 'BlogDetails',
                                    params: { blogg: JSON.stringify(blog) },
                                }"
                                class="btn btn-success"
                            >
                                Blog Details
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end row -->
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["blogs"]), // Use Vuex mapState to access the blogs state
    },

    methods: {
        ...mapActions(["fetchBlogs"]),
    },
    mounted() {
        // Fetch blogs data when the component is mounted
        this.fetchBlogs();
    },
};
</script>
<style>
.content-container {
    background-color: #f7f7f7; /* Set your desired background color */
    padding: 20px; /* Add padding to create space between content and background */
}
</style>
