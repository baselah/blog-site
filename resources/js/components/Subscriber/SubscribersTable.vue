<template>
    <div>
        <success-message :message="successMessage" />

        <!-- Flex container to place elements in the same line -->
        <div
            class="d-flex justify-content-between align-items-center mb-3 mr-5 ml-5 mt-3"
        >
            <!-- Create New Subscriber button -->
            <button class="btn btn-success" @click="openCreateDialog">
                Create New Subscriber
            </button>
            <div class="input-group ml-5">
                <span class="input-group-text">Search by name</span>
                <input
                    id="search"
                    type="text"
                    aria-label="Name"
                    class="form-control"
                    v-model="search"
                />
            </div>
        </div>

        <table class="table table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(subscriber, index) in subscribers" :key="index">
                    <td>{{ subscriber.id }}</td>
                    <td>{{ subscriber.name }}</td>
                    <td>{{ subscriber.user_name }}</td>
                    <td>{{ subscriber.password }}</td>
                    <td>{{ subscriber.status }}</td>
                    <td>
                        <button
                            class="btn btn-primary mr-5"
                            @click="openEditDialog(subscriber)"
                        >
                            Edit
                        </button>
                        <button
                            class="btn btn-danger"
                            @click="softDeleteSubscriber(subscriber.id)"
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
        :formData="editedSubscriber"
        @close-dialog="closeDialog"
        @create-subscriber="handleSubscriberCreated"
        @update-subscriber="handleSubscriberUpdated"
    ></edit-dialog>
</template>
<script>
import axios from "axios";
import EditDialog from "./FormSubscriber.vue";
export default {
    watch: {
        search: function (newSearch) {
            this.fetchSubscribers();
        },
    },
    components: {
        EditDialog, // Register the EditDialog component
    },
    data() {
        return {
            subscribers: [], // Initialize an empty array for subscribers data
            search: "",
            isDialogVisible: false,
            isCreateMode: false,
            editedSubscriber: {},
            isSubscriberUpdated: false,
            successMessage: "",
        };
    },
    methods: {
        searchSubscribers() {
            // Fetch subscribers data with the updated search value
            this.subscribers = this.subscribers.filter((subscriber) => {
                const searchLowerCase = this.search.toLowerCase();
                return subscriber.name.toLowerCase().includes(searchLowerCase);
            });
        },
        handleSubscriberCreated(data) {
            this.subscribers.push(data.subscriber);
            this.successMessage = data.message;
            this.isSubscriberUpdated = true;
        },
        handleSubscriberUpdated(updatedSubscriber) {
            this.isSubscriberUpdated = true;
            this.subscribers = this.subscribers.map((s) => {
                if (s.id === updatedSubscriber.id) {
                    return updatedSubscriber; // Replace the subscriber with updated data
                }
                return s;
            });
        },
        openEditDialog(subscriber) {
            this.editedSubscriber = { ...subscriber };
            this.isCreateMode = false; // Set to false for edit mode
            this.isDialogVisible = true;
        },
        openCreateDialog() {
            this.editedSubscriber = {}; // Clear the edited subscriber data
            this.isCreateMode = true; // Set to true for create mode
            this.isDialogVisible = true;
        },
        closeDialog() {
            this.isDialogVisible = false;
        },
        // Fetch subscribers data using Axios
        fetchSubscribers() {
            axios
                .get("/api/subscribers", { params: { search: this.search } })
                .then((response) => {
                    this.subscribers = response.data.subscribers.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        // Soft delete a subscriber
        softDeleteSubscriber(id) {
            axios
                .delete(`/api/subscribers/${id}`)
                .then((response) => {
                    this.successMessage = response.data.message;
                    // Remove the deleted subscriber from the list
                    this.subscribers = this.subscribers.filter(
                        (s) => s.id !== id
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    mounted() {
        // Fetch subscribers data when the component is mounted
        this.fetchSubscribers();
    },
};
</script>
