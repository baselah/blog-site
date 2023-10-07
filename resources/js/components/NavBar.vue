<template>
    <nav
        class="navbar navbar-expand-lg navbar-light mr-5 ml-5"
        style="background-color: #e3f2fd padding: ;"
    >
        <a class="navbar-brand" href="#">Blog Site</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link"
                        >Home<span class="sr-only">(current)</span></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/subscribers" class="nav-link"
                        >Subscribers</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/blogs" class="nav-link"
                        >Blogs</router-link
                    >
                </li>
            </ul>

            <!-- Conditional rendering based on user authentication -->
            <div v-if="userIsAuthenticated" class="ml-2">
                <span class="navbar-text" style="margin-right: 10px">{{
                    currentUser
                }}</span>
                <button
                    @click="logout"
                    class="btn btn-outline-danger my-2 my-sm-0"
                >
                    Logout
                </button>
            </div>
            <div v-else class="navbar-nav ml-2">
                <router-link
                    to="/login"
                    class="nav-link"
                    style="margin-right: 10px"
                    >Login</router-link
                >
                <router-link to="/register" class="nav-link"
                    >Register</router-link
                >
            </div>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("user", {
            userIsAuthenticated: (state) => state.isAuthenticated,
            currentUser: (state) => state.currentUser,
        }),
    },
    methods: {
        ...mapActions("user", ["logout"]),
    },
};
</script>

<style></style>
