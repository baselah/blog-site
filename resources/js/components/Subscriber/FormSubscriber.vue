<template>
    <div class="custom-dialog" v-if="visible">
        <div class="custom-dialog-content">
            <h2>{{ isCreateMode ? "Create" : "Edit" }} Subscriber</h2>
            <form @submit.prevent="handleSubmit">
                <!-- Form fields for subscriber data -->
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        v-model="formData.name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="UserName">Username:</label>
                    <input
                        type="text"
                        id="UserName"
                        v-model="formData.user_name"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="Password">Password:</label>
                    <input
                        type="text"
                        id="Password"
                        v-model="formData.password"
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
import axios from "axios";

export default {
    props: {
        visible: Boolean,
        isCreateMode: Boolean, // Prop to determine whether it's in create mode
        formData: Object,
    },

    methods: {
        handleSubmit() {
            // Handle form submission based on create or edit mode
            if (this.isCreateMode) {
                this.createSubscriber();
            } else {
                this.updateSubscriber();
            }
        },
        async updateSubscriber() {
            try {
                // Make a PUT request to your API with the updated subscriber data
                await axios
                    .put(`/api/subscribers/${this.formData.id}`, this.formData)
                    .then((res) => console.log(res));
                this.$emit("update-subscriber", this.formData); // Close the custom dialog
            } catch (error) {
                // Handle any errors that may occur during the request
                console.error("Error updating subscriber:", error);
            }
            this.closeDialog();
        },
        async createSubscriber() {
            try {
                await axios
                    .post(`/api/subscribers`, this.formData)
                    .then((res) => {
                        this.$emit("create-subscriber", res.data);
                    });
            } catch (error) {
                alert(error.response.data.message)
                console.error("Error creating subscriber:", error);
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
