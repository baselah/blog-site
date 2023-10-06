// router/index.js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("../views/Home.vue"), // Example: Home page component
        name: "home",
    },
    {
        path: "/about",
        component: () => import("../views/About.vue"), // Example: About page component
        name: "about",
    },
    // Add more routes for your pages here
];

const router = new VueRouter({
    routes,
    mode: "history", // Use history mode for cleaner URLs (requires server configuration)
});

export default router;
