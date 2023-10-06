<template>
    <div>
        <NavBar></NavBar>
    </div>
    <!-- <success-message></success-message> -->
</template>

<script>
import SubscribersTable from "./components/Subscriber/SubscribersTable.vue";
import BlogsTable from "./components/Blog/BlogsTable.vue";
import Home from "./components/Home/home.vue";

import NavBar from "./components/NavBar.vue";
import SuccessMessage from "./components/SuccessMessage.vue";

export default {
    components: {
        SubscribersTable,
        BlogsTable,
        NavBar,
        SuccessMessage,
        Home,
    },
};
</script>
