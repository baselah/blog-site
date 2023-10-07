<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4 login-form">
                <h2>Login</h2>
                <p v-if="error" class="error-message">{{ error }}</p>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="username">UserName:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="user_name"
                            v-model="user_name"
                            placeholder="Enter username"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input
                            type="password"
                            class="form-control"
                            v-model="password"
                            id="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" class="btn btn-success">Login</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            user_name: "",
            password: "",
            error : null
        };
    },
    methods: {
        ...mapActions('user', ["login"]),
        async handleSubmit() {
            try {
                await this.login({
                    user_name: this.user_name,
                    password: this.password,
                });
                this.$router.push('/');
            } catch (error) {
                this.error = "Login failed. Please check your credentials.";
                console.error(error);
            }
        },
    },
};
</script>

<style>
body {
    background-image: linear-gradient(to bottom right, #f7f7f7, #8ef071);
    background-attachment: fixed;
}

.login-form {
    margin-top: 80px;
}

#aa {
    margin-left: 130px;
}
.error-message {
  color: red;
}
</style>
