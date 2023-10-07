import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap";
import { createRouter, createWebHistory } from "vue-router";
import SubscribersTable from "./components/Subscriber/SubscribersTable.vue";
import BlogsTable from "./components/Blog/BlogsTable.vue";
import Home from "./components/Home/home.vue";
import SuccessMessage from "./components/SuccessMessage.vue";
import Login from "./components/Home/Login.vue";
import Details from "./components/Home/Details.vue";
import { requireAuth } from "./routeGuards";

// Adjust the path as needed
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home },
        {
            path: "/subscribers",
            component: SubscribersTable,
            beforeEnter: requireAuth,
        },
        { path: "/blogs", component: BlogsTable, beforeEnter: requireAuth },
        { path: "/login", component: Login },
        {
            path: "/details/:blogg",
            name: "BlogDetails",
            component: Details,
            props: true,
        },
    ],
});
const app = createApp(App);

app.component("SuccessMessage", SuccessMessage);
app.use(router);
app.use(store);

app.mount("#app");
