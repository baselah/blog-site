<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <!-- Blog Image -->
                <img
                    v-if="blog.image"
                    :src="blog.image"
                    alt="Blog Image"
                    class="img-fluid rounded mb-4"
                />

                <!-- Blog Title -->
                <h2 class="mb-4">{{ blog.title }}</h2>

                <!-- Blog Content -->
                <div class="mb-4">
                    <div class="blog-content" v-html="blog.content"></div>
                </div>

                <!-- Blog Status -->
                <div class="mb-4">
                    <strong>Status:</strong> {{ blog.status }}
                </div>

                <!-- Publish Date -->
                <div><strong>Publish Date:</strong> {{ blog.date }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        blogg: String,
    },
    computed: {
        blog() {
            return JSON.parse(this.blogg);
        },
    },
};
</script>

<style>
/* Apply styles to the blog content */
.blog-content {
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}

/* Style the blog title */
h2 {
  font-size: 28px;
  color: #333;
}

/* Style the image if available */
.img-fluid {
  max-width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Style the container */
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Add spacing between sections */
.mb-4 {
  margin-bottom: 20px;
}
</style>
