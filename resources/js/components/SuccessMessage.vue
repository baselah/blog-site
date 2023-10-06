<template>
    <div class="success-message" v-if="visible">
        <div class="alert alert-success">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
    },
    data() {
        return {
            visible: true,
        };
    },
    mounted() {
        // Automatically hide the success message after 10 seconds
        setTimeout(() => {
            this.visible = false;
        }, 5000); // 10 seconds = 10000 milliseconds
    },
};
</script>

<style scoped>
.success-message {
    margin-top: 10px;
}
</style>
