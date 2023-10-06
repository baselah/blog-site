<template>
    <nav
        class="navbar navbar-expand-lg navbar-light"
        style="background-color: #e3f2fd"
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
            <form class="form-inline my-2 my-lg-0">
                <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button
                    class="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                >
                    Search
                </button>
            </form>
            <!-- Add Login and Register links -->
            <ul class="navbar-nav ml-2" v-if="this.user">
                <li class="nav-item">
                    <router-link to="/login" class="nav-link"
                        >Login</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link"
                        >Register</router-link
                    >
                </li>
            </ul>
        </div>
    </nav>
    <router-view></router-view>
</template>

<script>
import { mapActions , mapState,mapGetters} from "vuex";
export default {
    computed: {
        ...mapState(["user"]), // Use Vuex mapState to access the blogs state
    },

    methods:{
        ...mapGetters(["isAuthenticated"]),


    },
    mounted(){
        console.log(this.user);

        console.log(this.isAuthenticated());
    }


}

</script>
