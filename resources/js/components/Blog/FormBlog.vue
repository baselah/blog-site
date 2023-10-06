<template>
    <div class="custom-dialog" v-if="visible">
        <div class="custom-dialog-content">
            <h2>{{ isCreateMode ? "Create" : "Edit" }} Blog</h2>
            <form @submit.prevent="handleSubmit">
                <!-- Form fields for blog data -->
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        v-model="formData.title"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="content">Content:</label>
                    <input
                        type="text"
                        id="content"
                        v-model="formData.content"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        v-model="formData.date"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="Status">Status:</label>
                    <input
                        type="text"
                        id="Status"
                        v-model="formData.status"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="image">Image:</label>
                    <input type="file" id="image" @change="handleImageUpload" />
                </div>
                <img
                    id="image-preview"
                    :src="isCreateMode ? imagePreview : formData.image"
                    alt="Image Preview"
                    class="blog-image"
                />
                <!-- Add other form fields for username, password, status, etc. -->

                <div class="buttons">
                    <button type="submit" class="btn btn-primary">
                        {{ isCreateMode ? "Create" : "Save" }}
                    </button>
                    <button class="btn btn-secondary" @click="closeDialog">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    props: {
        visible: Boolean,
        isCreateMode: Boolean, // Prop to determine whether it's in create mode
        formData: Object,
    },
    data() {
        return {
            imagePreview: null, // Store the image data URL for the preview
        };
    },
    methods: {
        ...mapActions(["createBlog", "updateBlog"]),

        handleImageUpload(event) {
            const file = event.target.files[0]; // Get the selected file

            if (file) {
                // Create a FileReader to read the file as a data URL
                const reader = new FileReader();

                // Define a callback function for when the reading is complete
                reader.onload = (e) => {
                    // Set the data URL as the image preview
                    this.imagePreview = e.target.result;
                };

                // Read the file as a data URL
                reader.readAsDataURL(file);

                // Assign the selected file to the formData
                this.formData.image = file;
            } else {
                // Clear the image if no file is selected (optional)
                this.formData.image = null;
            }
        },
        handleSubmit() {
            // Handle form submission based on create or edit mode
            if (this.isCreateMode) {
                this.createBlog(this.formData);
            } else {
                this.updateBlog(this.formData);
            }
            this.closeDialog();
        },

        closeDialog() {
            // Close the custom dialog
            this.$emit("close-dialog");
        },
    },
};
</script>

<style scoped>
.blog-image {
    max-width: 100px; /* Adjust the width as needed */
    max-height: 100px; /* Adjust the height as needed */
}
.custom-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* Ensure the dialog appears above other content */
}

.custom-dialog-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 10px;
}

.buttons {
    text-align: right;
}
</style>
